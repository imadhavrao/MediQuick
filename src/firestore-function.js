import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore"; 
import app from './firebase-config'; // Import your Firebase configuration

const db = getFirestore(app);

// Function to add a new document to a Firestore collection
export const addDocument = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e; // Re-throw the error for handling in the caller function
    }
};

// Function to get all documents from a Firestore collection
export const getAllDocuments = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = [];
        querySnapshot.forEach((doc) => {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    } catch (e) {
        console.error("Error getting documents: ", e);
        throw e; // Re-throw the error for handling in the caller function
    }
};

// Function to get a specific document by ID from a Firestore collection
export const getDocumentById = async (collectionName, id) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null; // Return null if the document doesn't exist
        }
    } catch (e) {
        console.error("Error getting document: ", e);
        throw e; // Re-throw the error for handling in the caller function
    }
};

// Function to update a document in a Firestore collection
export const updateDocument = async (collectionName, id, data) => {
    try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, data);
        console.log("Document updated successfully");
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e; // Re-throw the error for handling in the caller function
    }
};
