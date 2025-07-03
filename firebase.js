import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// Import firebase config
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, deleteDoc, updateDoc, getDocs, doc };