$(document).ready(function() {
    //load todo from cookies
    loadToDoList();

    //load and display todo from cookies
    function loadToDoList() {
        const todos = getCookie('todoList');
        if (todos) {
            const todoArray = JSON.parse(todos);
            todoArray.forEach(todo => addTodoToDOM(todo));
        }
    }

    // save todo into cookies
    function saveToDoList() {
        const todoItems = $('.todo-item');
        const todoArray = todoItems.map(function() {
            return $(this).text();
        }).get();

        setCookie('todoList', JSON.stringify(todoArray));
    }

    //add new todo to DOM
    function addTodoToDOM(todoText) {
        const $ftList = $('#ft_list');
        const $todoDiv = $('<div></div>').addClass('todo-item').text(todoText);

        // remove todo on confirmation
        $todoDiv.click(function() {
            const confirmation = confirm('Do you want to remove this task?');
            if (confirmation) {
                $(this).remove();
                saveToDoList();
            }
        });

        // add new todo at the top
        $ftList.prepend($todoDiv);
    }

    // create new todo
    $('#New').click(function() {
        const newTodo = prompt('Enter a new TO DO:');
        if (newTodo && newTodo.trim()) {
            addTodoToDOM(newTodo.trim());
            saveToDoList();
        }
    });

    //get a cookie by name
    function getCookie(name) {
        const cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split('=');
            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }

    //set a cookie with a name, value, and day
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `expires=${date.toUTCString()};`;
        }
        document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}path=/`;
    }
});
