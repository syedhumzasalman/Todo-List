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
            displayTask.innerHTML += `<div class="sec-div"><p>${i+1} :</p>
            <input class="jsinput" value = " ${todoList[i]}" readonly/>
            <button class="deletebtn" onclick="deleteTodo(${i})">Delete</button>
            <button class="editbtn" onclick="editTodo(${i})">Edit</button></div>`
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
    editButton.style.backgroundColor = "blue"
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
    editButton.style.backgroundColor = "green"
    editButton.setAttribute("onclick", `editTodo(${index})`);

}