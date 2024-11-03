// Import Firebase modules and configuration
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, signup, logout } from "./auth-functions";
import { uploadFile, downloadFile } from "./storage-functions";
import { getUserFileHistory } from "./firestore-functions";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login event handler
document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await login(email, password);
});

// Auth state listener to handle redirection
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "/dashboard.html";  // Redirect to dashboard if logged in
    } else {
        console.log("User not logged in");
    }
});

// File upload event handler
document.getElementById("upload-btn").addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input").files[0];
    if (fileInput) {
        await uploadFile(fileInput);
        alert("File uploaded successfully!");
    }
});

// File download example (replace with actual file name)
document.getElementById("download-btn").addEventListener("click", async () => {
    const fileName = "example.txt";  // Replace with the actual file name or reference
    const fileUrl = await downloadFile(fileName);
    window.open(fileUrl, "_blank");
});

// Load and display user's file history
async function loadFileHistory() {
    const fileHistory = await getUserFileHistory();
    const historyContainer = document.getElementById("history-container");
    fileHistory.forEach(file => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
        historyContainer.appendChild(listItem);
    });
}
window.onload = loadFileHistory;

// Logout event handler
document.getElementById("logout-btn").addEventListener("click", async () => {
    await logout();
    window.location.href = "/login.html";
});
