
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "./firebase.js";


let createTask = document.getElementById("createTask");
let addTaskBtn = document.getElementById("addTaskBtn");
let displayTask = document.getElementById("displayTask");



let addTodo = async () => {

    let taskValue = createTask.value.trim()

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

        const docRef = await addDoc(collection(db, "toDoList"), taskObj);
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

addTaskBtn.addEventListener('click', addTodo)


let displayTodo = async () => {
    displayTask.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "toDoList"));
    querySnapshot.forEach((doc) => {
        const { toDo, status, createdAt, completedAt } = doc.data();

        const createdDate = createdAt?.toDate?.()
            ? moment(createdAt.toDate()).format("MMMM Do YYYY, h:mm A")
            : "Unknown";

        const completedDate = completedAt?.toDate?.()
            ? moment(completedAt.toDate()).format("MMMM Do YYYY, h:mm A")
            : "";

        displayTask.innerHTML += `
      <div class="card shadow-lg border-0 rounded-4 p-3 mb-4" style="max-width: 100%; width: 100%;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start flex-wrap">
            <div>
              <div class="d-flex flex-wrap gap-2">
                <h6 class="text-muted mb-1">Created At</h6>
                <p class="text-secondary small mb-2">${createdDate}</p>
              </div>
              <p class="card-text mb-2">${toDo}</p>
            <div class="d-flex gap-2"> 
              <button 
                class="badge status-btn ${status === "Pending" ? "bg-warning text-dark" : "bg-success"}" 
                data-id="${doc.id}"
              >
                ${status}
              </button>
              <p class="text-secondary small mb-1" id="completedAt-${doc.id}">
                ${status === "Complete" ? `${completedDate}` : ""}
              </p>
              </div>
            </div>
            <div class="mt-3 mt-md-2 d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm editBtn" data-id="${doc.id}">
              <i class="bi bi-pencil"></i> Edit</button>
              <button class="btn btn-outline-danger btn-sm deleteBtn" data-id="${doc.id}">
              <i class="bi bi-trash"></i> Delete</button>
            </div>
          </div>
        </div>
      </div>`;
    });


    document.querySelectorAll(".status-btn").forEach((btn) => {
        btn.addEventListener("click", async function () {
            const currentStatus = this.innerText.trim();
            const newStatus = currentStatus === "Pending" ? "Complete" : "Pending";

            // Update UI
            this.innerText = newStatus;
            this.classList.remove(currentStatus === "Pending" ? "bg-warning" : "bg-success");
            this.classList.remove("text-dark");
            this.classList.add(newStatus === "Complete" ? "bg-success" : "bg-warning");
            if (newStatus === "Pending") this.classList.add("text-dark");

            const docId = this.getAttribute("data-id");
            const taskRef = doc(db, "toDoList", docId);

            try {
                await updateDoc(taskRef, {
                    status: newStatus,
                    completedAt: newStatus === "Complete" ? new Date() : null,
                });

                // Update Completed At display
                const completedPara = document.getElementById(`completedAt-${docId}`);
                if (newStatus === "Complete") {
                    const nowFormatted = moment(new Date()).format("MMMM Do YYYY, h:mm A");
                    completedPara.innerText = `${nowFormatted}`;
                } else {
                    completedPara.innerText = "";
                }

            } catch (error) {
                console.error("Error updating status:", error.message);
            }
        });
    });

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
        const docId = btn.getAttribute("data-id");
        btn.addEventListener("click", () => handleDelete(docId));
    });
    
};

displayTodo()

addTaskBtn.addEventListener('click', displayTodo)


let handleDelete = async (docId) => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
        await deleteDoc(doc(db, "toDoList", docId));
        displayTodo();
    } catch (error) {
        console.error("Delete error:", error.message);
    }
}



