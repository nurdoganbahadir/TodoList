//Kullanılacak Elementleri Seçelim

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector(".inputText");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector("#clearBtn");
const natification = document.querySelector(".messages");
const removeBtn = document.querySelector(".fa-solid fa-xmark");
const rowTwo = document.querySelector(".row-two");
const todoSearch = document.querySelector("#todoSearch");

let todos = []; //todolarımı buraya atıyorum
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  rowTwo.addEventListener("click", removeTodoToUI);
  clearBtn.addEventListener("click", allTodosEverywhere);
  todoSearch.addEventListener("keyup", filter);
}

//tüm todoları temizle butonu
function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    natification.textContent = "Tamamı silindi.";
    natification.style.backgroundColor = "green";
    setTimeout(function () {
      natification.textContent = "";
    }, 2500);
  } else {
    natification.textContent = "Silmek için en az 1 To-Do olmalıdır.";
    natification.style.backgroundColor = "red";
    setTimeout(function () {
      natification.textContent = "";
    }, 2500);
  }
}

// sayfayı yenilediğimde şunu yap
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
// arama inputu
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    natification.textContent =
      "Filtreleme yapmak için en az 1 todo olması gerekmetedir.";
    natification.style.backgroundColor = "yellow";
    setTimeout(function () {
      natification.textContent = "";
    }, 2500);
  }
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

  li.className = "list-item";
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
    //storageden silmek
    removeTodoToStorage(todo.textContent);
  }
}
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
