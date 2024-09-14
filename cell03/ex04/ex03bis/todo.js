$(document).ready(function() {
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
        $('.todo-item').each(function() {
            todos.push($(this).text());
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    }

    function addTodoToDOM(todoText) {
        const todoDiv = $('<div></div>').addClass('todo-item').text(todoText);
        todoDiv.on('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                $(this).remove();
                saveTodos();
            }
        });
        $('#ft_list').prepend(todoDiv);
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
