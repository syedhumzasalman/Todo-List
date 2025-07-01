document.title = ("TO-DO LIST");


let createTask = document.querySelector("#createTask");
let displayTask = document.querySelector("#displayTask");

let todoList = [];

createTask.addEventListener("keydown", function (event) {
    if(event.key === 'Enter'){
        addTodo()   
    }
} )

function taskDisplay() {
    displayTask.innerHTML = "";

    for (let i = 0; i < todoList.length; i++) {
            displayTask.innerHTML += `<div class="card task-card mb-3 bg-dark text-white border-secondary">
                    <div class="card-body d-flex justify-content-between align-items-center flex-wrap">
                        <div class="d-flex align-items-center">
                            <span class="badge bg-primary me-3">${i + 1}</span>
                            <input class="jsinput form-control-plaintext text-white" 
                             value="${todoList[i]}" readonly>
                        </div>
                        <div class="d-flex flex-wrap gap-2">
                            <button class="btn btn-sm btn-outline-warning me-2 editbtn" 
                                    onclick="editTodo(${i})">
                                <i class="bi bi-pencil">Edit</i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" 
                                    onclick="deleteTodo(${i})">
                                <i class="bi bi-trash">Delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
    }
}



function addTodo() {  
    // console.log(createTask.value);
    // console.log(todoList);
    
    if(createTask.value.trim() === ""){
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


function deleteTodo(index){

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
    editButton.setAttribute("onclick" , `saveTodo(${index})`);
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