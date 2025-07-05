import { auth, signInWithEmailAndPassword, onAuthStateChanged } from "../fireBase.js";

//  Only run this once to check if user is already logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is logged in, go to dashboard
        Swal.fire("Logged In", "Welcome!", "success");
        window.location.replace("/todoHome.html");
    } else {
        document.getElementById("custom-loader").style.display = "none";
        document.body.style.display = "block";
    }
});


let handelSignIn = () => {

    let signinEmail = document.getElementById("signinEmail");
    let signinPassword = document.getElementById("signinPassword");

    let loginEmail = signinEmail.value.trim();
    let loginPassword = signinPassword.value.trim();

    // Check if empty
    if (!loginEmail || !loginPassword) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }
    //  check if Email include @gamil.com or not
    if (!loginEmail.includes("@gmail.com")) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid Gmail address!",
        });
        return;
    }

    //  Firebase Sign In
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            const user = userCredential.user;

            Swal.fire("Logged In", "Welcome!", "success");
            window.location.href = "/todoHome.html";
        })
        .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: "Login Failed",
                text: "Invalid email or password.",
                footer: `<code>${error.code}</code>`,
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#00f7ff',
                background: '#333',
                color: '#fff',
                backdrop: `rgba(0, 0, 0, 0.8)`
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/index.html';
                }
            });
        });
}

document.getElementById("login").addEventListener("click", handelSignIn);