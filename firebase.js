import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    getDocs,
    setDoc,
    getDoc,

} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut,
    signInWithEmailAndPassword,  GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";





// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {
    app, db, collection, addDoc, deleteDoc, updateDoc, getDocs, doc, auth,
    createUserWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut,
    signInWithEmailAndPassword, setDoc, getDoc,  GoogleAuthProvider, signInWithPopup
};