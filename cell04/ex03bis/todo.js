$(document).ready(function() {
    function getCookies() {
        const cookies = document.cookie.split('; ');
        let cookieObj = {};
        $.each(cookies, function(index, cookie) {
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
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodoToDOM(todoText) {
        const $todoDiv = $('<div class="todo-item"></div>').text(todoText);
        $todoDiv.on('click', function() {
            const confirmDelete = confirm('Do you want to remove this TO DO?');
            if (confirmDelete) {
                $todoDiv.remove();
                saveTodos();
            }
        });
        $('#ft_list').append($todoDiv); 
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        $.each(todos, function(index, todo) {
            addTodoToDOM(todo);
        });
    }

    $('#new').on('click', function() {
        const todoText = prompt('Enter a new TO DO:');
        if (todoText) {
            addTodoToDOM(todoText);
            saveTodos();
        }
    });

    loadTodos();
});
