//Kullanılacak Elementleri Seçelim

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector(".inputText");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector("#clearBtn");
const natification = document.querySelector(".messages");
const removeBtn = document.querySelector(".fa-solid fa-xmark");
const rowTwo = document.querySelector(".row-two");

let todos = []; //todolarımı buraya atıyorum
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  rowTwo.addEventListener("click", removeTodoToUI);
}
// sayfayı yenilediğimde şunu yap
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  //burada bildirimi veriyorum ve çalışma şeklimi ekliyorum
  const inputText = addInput.value.trim();
  if (inputText === "" || inputText === null) {
    natification.textContent = "Lütfen bir değer giriniz";
    natification.style.backgroundColor = "green";
    setTimeout(function () {
      natification.textContent = "";
    }, 2000);
  } else {
    //arayüz ekleme
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    natification.textContent = "Başarıyla eklendi.";
    natification.style.backgroundColor = "green";
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
// burada todolarımın görüntülecenk olan yeri ekliyorum
function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  const i = document.createElement("i");

  li.className = "lilst-item";
  li.textContent = newTodo;
  i.className = "fa-solid fa-xmark";

  todoList.appendChild(li);
  li.appendChild(i);

  addInput.value = ""; //todomu girince inputu sıfırlıyorum
}

// todo silme
function removeTodoToUI(e) {
  if (e.target.className === "fa-solid fa-xmark") {
    const todo = e.target.parentElement;
    todo.remove();
    natification.textContent = "Başarıyla silindi";
    natification.style.backgroundColor = "red";
    setTimeout(function () {
      natification.textContent = "";
    }, 2000);
  }
}
