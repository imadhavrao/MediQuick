// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // Replace with your API key
    authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Auth domain
    projectId: "YOUR_PROJECT_ID", // Replace with your Project ID
    storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your Storage Bucket
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Messaging Sender ID
    appId: "YOUR_APP_ID", // Replace with your App ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized app to use in other parts of your application
export default app;
