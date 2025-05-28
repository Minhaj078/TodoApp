const todoForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoListUL = document.querySelector("#todo-list");

let alltodos = getTodo(); // load saved todos
updateTodoList();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoText.length > 0) {
    alltodos.push({
      text: todoText,
      completed: false,
    });
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodoList() {
  todoListUL.innerHTML = "";
  if (alltodos.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "🎉 Nothing to do. Enjoy your day!";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.color = "var(--secondary-color)";
    todoListUL.append(emptyMessage);
    return;
  }
  alltodos.forEach((todo, todoindex) => {
    const todoItem = createTodoItem(todo, todoindex);
    todoListUL.append(todoItem);
  });
}


function createTodoItem(todo, todoindex) {
  const todoId = "todo-" + todoindex;

  const todoLI = document.createElement("li");
  todoLI.className = "todo";

  // ✅ FIXED: Use todo.text instead of full object
  todoLI.innerHTML = `
    <input type="checkbox" id="${todoId}">
    <label for="${todoId}" class="custom-checkbox">
      <img src="icons/check.png" alt="CheckMark">
    </label>
    <label for="${todoId}" class="todo-text">
      ${todo.text}
    </label>
    <button class="delete-button">
      <img src="icons/delete3.png" alt="Delete">
    </button>
  `;

  // Delete handler
  const deleteBtn = todoLI.querySelector(".delete-button");

deleteBtn.addEventListener("click", function () {
  todoLI.classList.add("fade-out");
  setTimeout(() => {
    deleteTodoItem(todoindex);
  }, 300);
});


  // Checkbox handler
  const checkbox = todoLI.querySelector("input");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    alltodos[todoindex].completed = checkbox.checked;
    saveTodos();
  });

  return todoLI;
}

function deleteTodoItem(todoindex) {
  alltodos = alltodos.filter((_, i) => i !== todoindex);
  saveTodos();
  updateTodoList();
}

function saveTodos() {
  const todosJson = JSON.stringify(alltodos);
  localStorage.setItem("todos", todosJson);
}

function getTodo() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}


