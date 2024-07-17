//Kullanılacak Elementleri Seçelim

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector(".inputText");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector("#clearBtn");
const natification = document.querySelector(".messages");

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText === "" || inputText === null) {
    natification.textContent = "Lütfen bir değer giriniz";
  } else {
    //arayüz ekleme
    addTodoToUI(inputText);
    natification.textContent = "Başarıyla eklendi.";
  }
  //storage ekleme
  e.preventDefault();
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
// <i class="fa-solid fa-xmark"></i>;
