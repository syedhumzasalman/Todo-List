import {
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onAuthStateChanged,
  getDoc
} from "../fireBase.js";

let currentUser = null;
const loader = document.getElementById("custom-loader");
let userNameDisplay = document.getElementById("userNameDisplay");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    document.body.style.display = "block";
    setTimeout(() => {
      window.location.replace("index.html");
    }, 0);
  } else {
    currentUser = user;

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        userNameDisplay.innerText = userData.name || "User";
      } else {
        userNameDisplay.innerText = "User";
      }
    } catch (error) {
      console.error("Failed to get user name:", error.message);
      userNameDisplay.innerText = "User";
    }

    if (loader) {
      loader.style.display = "none";
    }
    document.body.style.display = "block";

    displayTodo();
  }
});

let createTask = document.getElementById("createTask");
let addTaskBtn = document.getElementById("addTaskBtn");
let displayTask = document.getElementById("displayTask");



let addTodo = async () => {
  let taskValue = createTask.value.trim();

  if (!taskValue) {
    Swal.fire({
      title: "Oops!",
      text: "Please enter a task 😇",
      icon: "warning",
      confirmButtonText: "OK",
      background: "#fffbe6",
      color: "#d33",
      confirmButtonColor: "#ff7eb3",
    });
    return;
  }

  try {
    const taskObj = {
      toDo: taskValue,
      createdAt: new Date(),
      completedAt: new Date(),
      status: "Pending",
    };

    const userTasksRef = collection(db, "users", currentUser.uid, "tasks");
    await addDoc(userTasksRef, taskObj);
    createTask.value = "";
    displayTodo();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

let displayTodo = async () => {
  if (!currentUser) return;
  displayTask.innerHTML = "";
  const userTasksRef = collection(db, "users", currentUser.uid, "tasks");
  const querySnapshot = await getDocs(userTasksRef);

  querySnapshot.forEach((docSnap) => {
    const { toDo, status, createdAt, completedAt } = docSnap.data();

    const createdDate = createdAt?.toDate?.()
      ? moment(createdAt.toDate()).format("MMMM Do YYYY, h:mm A")
      : "Unknown";

    const completedDate = completedAt?.toDate?.()
      ? moment(completedAt.toDate()).format("MMMM Do YYYY, h:mm A")
      : "";

    displayTask.innerHTML += `
      <div class="card shadow-lg border-0 rounded-4 p-3 mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start flex-wrap">
            <div>
              <div class="d-flex flex-wrap gap-2">
                <h6 class="text-muted mb-1">Created At</h6>
                <p class="text-secondary small mb-2">${createdDate}</p>
              </div>
              <p class="card-text mb-2">${toDo}</p>
              <div class="d-flex gap-2">
                <button class="badge status-btn ${status === "Pending" ? "bg-warning text-dark" : "bg-success"}" data-id="${docSnap.id}">
                  ${status}
                </button>
                <p class="text-secondary small mb-1" id="completedAt-${docSnap.id}">
                  ${status === "Complete" ? `${completedDate}` : ""}
                </p>
              </div>
            </div>
            <div class="mt-3 mt-md-2 d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm editBtn" data-id="${docSnap.id}" data-text="${toDo}">
                <i class="bi bi-pencil"></i> Edit</button>
              <button class="btn btn-outline-danger btn-sm deleteBtn" data-id="${docSnap.id}">
                <i class="bi bi-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>`;
  });

  attachTaskEvents();
};


function attachTaskEvents() {
  document.querySelectorAll(".status-btn").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const currentStatus = this.innerText.trim();
      const newStatus = currentStatus === "Pending" ? "Complete" : "Pending";

      this.innerText = newStatus;
      this.classList.remove(currentStatus === "Pending" ? "bg-warning" : "bg-success");
      this.classList.remove("text-dark");
      this.classList.add(newStatus === "Complete" ? "bg-success" : "bg-warning");
      if (newStatus === "Pending") this.classList.add("text-dark");

      const docId = this.getAttribute("data-id");
      const taskRef = doc(db, "users", currentUser.uid, "tasks", docId);

      try {
        await updateDoc(taskRef, {
          status: newStatus,
          completedAt: newStatus === "Complete" ? new Date() : null,
        });

        const completedPara = document.getElementById(`completedAt-${docId}`);
        completedPara.innerText = newStatus === "Complete"
          ? moment(new Date()).format("MMMM Do YYYY, h:mm A")
          : "";

      } catch (error) {
        console.error("Error updating status:", error.message);
      }
    });
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    const docId = btn.getAttribute("data-id");
    btn.addEventListener("click", () => handleDelete(docId));
  });

  document.querySelectorAll(".editBtn").forEach((btn) => {
    const docId = btn.getAttribute("data-id");
    const currentText = btn.getAttribute("data-text");
    btn.addEventListener("click", () => handleEdit(docId, currentText));
  });
}

let handleDelete = async (docId) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This task will be deleted permanently.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteDoc(doc(db, "users", currentUser.uid, "tasks", docId));
    displayTodo();
  } catch (error) {
    console.error("Delete error:", error.message);
  }
};

let handleEdit = async (docId, currentText) => {
  const { value: newText } = await Swal.fire({
    title: 'Edit Task',
    input: 'text',
    inputLabel: 'Update your task',
    inputValue: currentText,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    inputValidator: (value) => {
      if (!value.trim()) {
        return 'Task cannot be empty!';
      }
    }
  });

  if (newText && newText !== currentText) {
    try {
      const taskRef = doc(db, "users", currentUser.uid, "tasks", docId);
      await updateDoc(taskRef, { toDo: newText });
      Swal.fire('Updated!', 'Your task was updated.', 'success');
      displayTodo();
    } catch (error) {
      console.error("Edit error:", error.message);
      Swal.fire('Error', 'Failed to update task.', 'error');
    }
  }
};

window.addEventListener("DOMContentLoaded", () => {
  addTaskBtn.addEventListener("click", addTodo);
});
