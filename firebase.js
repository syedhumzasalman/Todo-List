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


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkJnxlncA3zMtLzvff4lzRrlLvWj8bbHw",
    authDomain: "to-do-list-66f51.firebaseapp.com",
    projectId: "to-do-list-66f51",
    storageBucket: "to-do-list-66f51.firebasestorage.app",
    messagingSenderId: "1035192080492",
    appId: "1:1035192080492:web:6b6af8dc2fd07122cce049"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, addDoc, deleteDoc, updateDoc, getDocs, doc };