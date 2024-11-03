import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

// Function to sign up a new user
export const signUpUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User signed up successfully:", user);
        return user;
    } catch (error) {
        console.error("Error signing up user:", error);
        throw error; // Throw the error to handle it in the calling function
    }
};

// Function to log in an existing user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User logged in successfully:", user);
        return user;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error; // Throw the error to handle it in the calling function
    }
};

// Function to send a password reset email
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw error; // Throw the error to handle it in the calling function
    }
};
