import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"; 
import app from './firebase-config'; // Import your Firebase configuration

const storage = getStorage(app);

// Function to upload a file to Firebase Storage
export const uploadFile = async (filePath, file) => {
    try {
        const storageRef = ref(storage, filePath);
        const snapshot = await uploadBytes(storageRef, file);
        console.log("Uploaded a file!", snapshot);
        // Get the download URL after the file is uploaded
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL; // Return the download URL for the uploaded file
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error; // Re-throw the error for handling in the caller function
    }
};

// Function to get a file's download URL from Firebase Storage
export const getFileURL = async (filePath) => {
    try {
        const storageRef = ref(storage, filePath);
        const url = await getDownloadURL(storageRef);
        return url; // Return the download URL of the file
    } catch (error) {
        console.error("Error getting file URL: ", error);
        throw error; // Re-throw the error for handling in the caller function
    }
};

// Function to delete a file from Firebase Storage
export const deleteFile = async (filePath) => {
    try {
        const storageRef = ref(storage, filePath);
        await deleteObject(storageRef);
        console.log("File deleted successfully");
    } catch (error) {
        console.error("Error deleting file: ", error);
        throw error; // Re-throw the error for handling in the caller function
    }
};
