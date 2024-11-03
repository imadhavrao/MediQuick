import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const db = getFirestore();

// Function to fetch all users from Firestore
export const fetchAllUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return userList;
};

// Function to delete a user from Firestore
export const deleteUser = async (userId) => {
    try {
        await deleteDoc(doc(db, "users", userId));
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user: ", error);
    }
};

// Function to fetch all shared data
export const fetchSharedData = async () => {
    const dataCollection = collection(db, "sharedData");
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return dataList;
};

// Function to delete shared data by ID
export const deleteSharedData = async (dataId) => {
    try {
        await deleteDoc(doc(db, "sharedData", dataId));
        console.log("Shared data deleted successfully");
    } catch (error) {
        console.error("Error deleting shared data: ", error);
    }
};
