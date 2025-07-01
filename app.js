document.title = ("TO-DO LIST");


let createTask = document.querySelector("#createTask");
let displayTask = document.querySelector("#displayTask");

let todoList = [];

createTask.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        addTodo()
    }
})

function taskDisplay() {
    displayTask.innerHTML = "";

    for (let i = 0; i < todoList.length; i++) {
        displayTask.innerHTML += `
  <div class="card shadow-sm mb-3 border-0 bg-gradient bg-dark text-white">
    <div class="card-body d-flex justify-content-between align-items-center flex-wrap px-4 py-3">
      
      <div class="d-flex align-items-center flex-wrap gap-3">
        <span class="badge rounded-pill bg-primary fs-6">${i + 1}</span>
        <input 
          class="jsinput bg-transparent border-0 text-white fw-medium fs-6 px-0 dynamic-input" 
          value="${todoList[i]}" 
          readonly 
          oninput="autoResizeInput(this)"
        />
      </div>

      <div class="d-flex gap-2 mt-2 mt-md-0">
        <button class="btn btn-sm btn-outline-warning editbtn" onclick="editTodo(${i})">
          <i class="bi bi-pencil-square me-1"></i>Edit
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTodo(${i})">
          <i class="bi bi-trash me-1"></i>Delete
        </button>
      </div>

    </div>
  </div>
`;

    }
}


function autoResizeInput(input) {
    input.style.width = '1px';
    input.style.width = input.scrollWidth + 'px';
}

// Call once after rendering
setTimeout(() => {
    document.querySelectorAll(".dynamic-input").forEach(autoResizeInput);
}, 0);


function addTodo() {
    // console.log(createTask.value);
    // console.log(todoList);

    if (createTask.value.trim() === "") {
        Swal.fire({
            title: "Oops!",
            text: "Please enter a task 😇",
            icon: "warning",
            confirmButtonText: "OK",
            background: "#fffbe6",
            color: "#d33",
            confirmButtonColor: "#ff7eb3"
        });
        return
    }

    todoList.push(createTask.value);
    createTask.value = "";

    taskDisplay()
}


function deleteTodo(index) {

    //  console.log(index);

    todoList.splice(index, 1)

    taskDisplay()

}

// function editTodo(index){
// // console.log(index);

// let update = prompt("Enter Your Updated Task");

// todoList[index] = update;

// if(update === ""){
//     return  alert("Enter Task")
// }

// taskDisplay()

// }

function editTodo(index) {

    let inputField = document.querySelectorAll(".jsinput")[index];
    // console.log(inputField.value);
    inputField.removeAttribute("readonly");
    inputField.focus();

    let editButton = document.querySelectorAll(".editbtn")[index];
    editButton.innerText = "Save";
    editButton.setAttribute("onclick", `saveTodo(${index})`);
}

function saveTodo(index) {

    // console.log("ye chala");

    let inputField = document.querySelectorAll(".jsinput")[index];
    let updatedTask = inputField.value.trim();

    // console.log(updatedTask);

    if (updatedTask === "") {
        Swal.fire({
            title: "Oops!",
            text: "Please enter a task 😇",
            icon: "warning",
            confirmButtonText: "OK",
            background: "#fffbe6",
            color: "#d33",
            confirmButtonColor: "#ff7eb3"
        });
        return;
    }

    todoList[index] = updatedTask;
    inputField.setAttribute("readonly", true);

    let editButton = document.querySelectorAll(".editbtn")[index];
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", `editTodo(${index})`);

}