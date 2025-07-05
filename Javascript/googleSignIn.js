import { auth, GoogleAuthProvider, signInWithPopup, setDoc, doc, onAuthStateChanged, db } from "../fireBase.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        document.getElementById("custom-loader").style.display = "none";
        document.body.style.display = "block";
    }
});

const provider = new GoogleAuthProvider();

const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            createdAt: new Date(),
        });

        await Swal.fire("Success", "Account Created", "success");
        window.location.replace("/todoHome.html");

    } catch (error) {
        console.error("Google sign-in error:", error.message);
        Swal.fire("Error", error.message, "error");
    }
};


document.getElementById("googleLoginBtn").addEventListener("click", googleLogin);