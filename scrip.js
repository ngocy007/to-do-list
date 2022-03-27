var form = document.querySelector("form");
var input = document.querySelector("input");
var ul = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let val = input.value.trim();
  if (val) {
    addTodoElement({
      text: val,
      status: "",
    });
  }
  saveTodos();
  input.value = "";
});

function addTodoElement(todo) {
  var li = document.createElement("li");
  li.innerHTML =
    " <span>" + todo.text + "</span > <i class='bx bxs-trash'></i> ";

  if (todo.status == "completed") li.setAttribute("class", "completed");

  li.addEventListener("click", function () {
    this.classList.toggle("completed");
  });
  li.querySelector("i").addEventListener("click", function () {
    this.parentNode.remove();
    saveTodos();
  });
  ul.appendChild(li);
}

function saveTodos() {
  var todostorage = [];
  var todolist = document.querySelectorAll("li");

  todolist.forEach(function (item) {
    let text = item.querySelector("span").innerText;
    let status = item.className;
    todostorage.push({
      text,
      status,
    });
  });
  localStorage.setItem("todolist", JSON.stringify(todostorage));
}
function initTodos() {
  let data = JSON.parse(localStorage.getItem("todolist"));
  data.forEach((e) => addTodoElement(e));
}
initTodos();
