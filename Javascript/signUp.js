import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "../fireBase.js";

import {
  db,
  setDoc,
  doc
} from "../fireBase.js";




onAuthStateChanged(auth, (user) => {
  if (!user) {
    const loader = document.getElementById("custom-loader");
    loader.style.display = "none";
    document.body.style.display = "block";
  }
});



const handelSignUp = async () => {
  let userName = document.getElementById("userName");
  let signupEmail = document.getElementById("signupEmail");
  let signupPassword = document.getElementById("signupPassword");

  let name = userName.value.trim();
  let email = signupEmail.value.trim();
  let password = signupPassword.value.trim();

  if (!name || !email || !password) {
    return Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "All fields are required!",
    });
  }

  if (!email.includes("@gmail.com")) {
    return Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid Gmail address!",
    });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      uid: user.uid,
      createdAt: new Date(),
    });

    await Swal.fire("Success", "Account Created", "success");
    window.location.replace("/todoHome.html");

  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: "Sign Up Failed",
      text: "Something went wrong. Try again",
      footer: `<code>${error.code}</code>`,
      confirmButtonText: 'Go to Login',
      confirmButtonColor: '#00f7ff',
      background: '#333',
      color: '#fff',
      backdrop: `rgba(0, 0, 0, 0.8)`
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/index.html';
      }
    });
  }
};

document.getElementById("register").addEventListener("click", handelSignUp);


