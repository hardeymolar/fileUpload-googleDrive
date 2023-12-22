const express = require('express');
const multer = require('multer');
const stream = require("stream");
const path = require("path");
const { google } = require('googleapis');

const upload = multer();

// Authentication and authorization details
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(__dirname, "./credentials.json");

// Configure Google Drive API client
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newline characters
    },
    scopes: SCOPES,
});
const drive = google.drive({ version: 'v3', auth });

const app = express();

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: "v3", auth }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileObject.originalname,
            parents: ["10qiBYXCzNbrZAD9sKRu2kby6ngfuEY00"],
        },
        fields: "id,name",
    })
    console.log(`uploaded file ${data.name} ${data.id}`)
    return data.id;
}

async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}
async function deletefile(fileId){
    try {
        const response = await drive.files.delete({
            fileId: fileId
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// Endpoint for file upload and generate public url
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { body, file } = req
        const fieId = await uploadFile(file);
        const fileUrl = await generatePublicUrl(fieId);
        res.status(200).json({message:"form submitted",fileUrl: fileUrl});
    } catch (error) {
        console.error(error);
        res.send(f.message);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});