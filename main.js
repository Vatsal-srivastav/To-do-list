const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function createTodoItem(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // Toggle completed state on click
    li.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) return;
        li.classList.toggle('completed');
        saveTasks(); // Add this line
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', function () {
        li.remove();
        saveTasks(); // Add this line
    });

    li.appendChild(delBtn);
    return li;
}

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = todoInput.value.trim();
    if (value) {
        const todoItem = createTodoItem(value);
        todoList.appendChild(todoItem);
        saveTasks(); // Add this line
        todoInput.value = '';
        todoInput.focus();
    }
});

document.getElementById('clear-tasks').addEventListener('click', function() {
    todoList.innerHTML = '';
    saveTasks();
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTodoItem(task.text);
        if (task.completed) li.classList.add('completed');
        todoList.appendChild(li);
    });
}

loadTasks();