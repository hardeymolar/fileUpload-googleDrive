# Setting Up Google Drive API for File Upload

Follow these steps to set up the Google Drive API for file upload:

1. **Create a Google Cloud Platform (GCP) Account:**
   - Visit [console.cloud.google.com](https://console.cloud.google.com/) and sign in or create a new account.

2. **Create a Project:**
   - Once logged in, create a new project and give it a name of your choice.

3. **Enable Google Drive API:**
   - Open the project, navigate to the "Enabled API & Services" tab.
   - Search for "Google Drive" and click to open. Enable the API for your project.

4. **Create Service Account and Generate JSON Key:**
   - Go to the "Create Credentials" button on your project home page.
   - Select "Service Account" and provide the necessary details (name, role - admin, and permissions).
   - Open the "Key" tab in your service account and generate a JSON key. Download the key to your local storage.

5. **Set Environment Variables:**
   - From the downloaded JSON key, extract the `client_email` and `private_key`.
   - Set these as environment variables in your project. For example:
     ```bash
     export GOOGLE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
     export GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
     ```

6. **Configure Folder Access in Google Drive:**
   - In Google Drive, create a folder where you want to upload files.
   - Open the folder, go to "Manage Access," and add your `client_email` with editor access.

Now you're ready
