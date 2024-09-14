function getCookies() {
    const cookies = document.cookie.split('; ');
    let cookieObj = {};
    cookies.forEach(cookie => {
        let [key, value] = cookie.split('=');
        cookieObj[key] = decodeURIComponent(value);
    });
    return cookieObj;
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        todos.push(item.textContent);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
}

function addTodoToDOM(todoText) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.textContent = todoText;
    todoDiv.addEventListener('click', function() {
        const confirmDelete = confirm('Do you want to remove this TO DO?');
        if (confirmDelete) {
            todoDiv.remove();
            saveTodos(); 
        }
    });
    const list = document.getElementById('ft_list');
    list.prepend(todoDiv); 
}

document.getElementById('new').addEventListener('click', function() {
    const todoText = prompt('Enter a new TO DO:');
    if (todoText) {
        addTodoToDOM(todoText);
        saveTodos(); 
    }
});

window.onload = loadTodos;
