const form = document.querySelector('.todo-container__form');
const todoInput = document.querySelector('.todo-container__input');
const todoList = document.querySelector('.todo-container__list');
const deleteButton = document.querySelector('.todo-container__delBtn');
const deleteAllButton = document.querySelector('.todo-container__delAllBtn');
let todos = [];

// Load todos from local storage
const loadTodos = () => {
  const todosString = localStorage.getItem('todos');
  if (todosString) {
    todos = JSON.parse(todosString);
  }
  renderTodos();
}

// Render all todos
const renderTodos = () => {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="todo-${index}" ${todo.completed ? 'checked' : ''} ${todo.selected ? 'class="selected"' : ''}>
      <label for="todo-${index}" ${todo.completed ? 'class="completed"' : ''}>${todo.text}</label>
      <button class="delete-todo">Delete</button>
      <button class="edit-todo">Edit</button>
    `;
    li.querySelector('input').addEventListener('click', () => {
      toggleComplete(index);
    });
    li.querySelector('.delete-todo').addEventListener('click', () => {
      removeTodo(index);
    });
    li.querySelector('.edit-todo').addEventListener('click', () => {
      editTodoText(index);
    });
    todoList.appendChild(li);
  });
}


// Save todos to local storage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo to list
const addTodo = (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    todos.push({
      text: todoText,
      completed: false,
      selected: false
    });
    todoInput.value = '';
    saveTodos();
    renderTodos();
  }
}

// Toggle todo completion status
const toggleComplete = (index) => {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Remove todo from list
const removeTodo = (index) => {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Edit todo text
const editTodoText = (index) => {
  const newTodoText = prompt('Enter new todo text:', todos[index].text);
  if (newTodoText && newTodoText.trim().length > 0) {
    todos[index].text = newTodoText.trim();
    saveTodos();
    renderTodos();
  }
}

// Delete all selected todos from list
const deleteSelectedTodos = () => {
  todos = todos.filter((todo) => !todo.selected);
  saveTodos();
  renderTodos();
}

// Delete all todos from list
const deleteAllTodos = () => {
  todos = [];
  saveTodos();
  renderTodos();

}

// Event listeners
form.addEventListener('submit', addTodo);
deleteButton.addEventListener('click', deleteSelectedTodos);
deleteAllButton.addEventListener('click', deleteAllTodos);
todoList.addEventListener('click', (event) => {
  const target = event.target;
  if (target.matches('.selected')) {
    target.classList.remove('selected');
    todos[target.id.split('-')[1]].selected = false;
  } else {
    target.classList.add('selected');
    todos[target.id.split('-')[1]].selected = true;
  }
});

// Load initial todos from local storage
loadTodos();

