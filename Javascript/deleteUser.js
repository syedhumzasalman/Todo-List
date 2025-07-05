import { auth, db, deleteUser, doc, deleteDoc } from "../fireBase.js";

const deleteUserFun = async () => {
  const user = auth.currentUser;

  if (!user) return;

  const confirmation = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover this account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    reverseButtons: true
  });

  if (!confirmation.isConfirmed) return;

  try {
    
    await deleteDoc(doc(db, "users", user.uid));

    
    await deleteUser(user);

    Swal.fire({
      title: "User Deleted Successfully 🎉",
      text: "Your account has been permanently deleted.",
      icon: "success",
      timer: 4000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "/index.html";
    });
  } catch (error) {
    Swal.fire("Failed to Delete", error.message, "error");
  }
};


const userDelete = document.getElementById("userDelete");
userDelete.addEventListener("click", deleteUserFun);
