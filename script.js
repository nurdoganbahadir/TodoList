//Kullanılacak Elementleri Seçelim

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector(".inputText");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector("#clearBtn");
const natification = document.querySelector(".messages");
const removeBtn = document.querySelector(".fa-solid fa-xmark");

let todos = [];
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText === "" || inputText === null) {
    natification.textContent = "Lütfen bir değer giriniz";
    setTimeout(function () {
      natification.textContent = "";
    }, 2000);
  } else {
    //arayüz ekleme
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    natification.textContent = "Başarıyla eklendi.";
    setTimeout(function () {
      natification.textContent = "";
    }, 2000);
  }
  //storage ekleme
  e.preventDefault();
}

function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  const i = document.createElement("i");

  li.className = "lilst-item";
  li.textContent = newTodo;
  i.className = "fa-solid fa-xmark";

  todoList.appendChild(li);
  li.appendChild(i);

  addInput.value = "";
}
