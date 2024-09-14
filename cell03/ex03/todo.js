document.addEventListener('DOMContentLoaded', function() {
    const ftList = document.getElementById('ft_list');
    const newButton = document.getElementById('New');

    loadTodos();

    //create new to do
    newButton.addEventListener('click', function() {
        const todo = prompt('Create a new TO DO:');
        if (todo) {
            addTodo(todo);
            saveTodos();
        }
    });

    //add new to do
    function addTodo(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'item';
        todoDiv.textContent = todo;

        // add click to remove to do
        todoDiv.addEventListener('click', function() {
            if (confirm('Do you want to remove this TO DO?')) {
                todoDiv.remove();
                saveTodos();
            }
        });

        // add to do to list
        ftList.insertBefore(todoDiv, ftList.firstChild);
    }

    // save to do to cookies
    function saveTodos() {
        const todos = Array.from(ftList.children).map(function(item) {
            return item.textContent;
        });
        document.cookie = `todos=${JSON.stringify(todos)}; path=/;`;
    }

    // load to do list from cookies
    function loadTodos() {
        const cookies = document.cookie.split('; ');
        const todoCookie = cookies.find(cookie => cookie.startsWith('todos='));
        if (todoCookie) {
            const todos = JSON.parse(todoCookie.split('=')[1]);
            todos.forEach(addTodo);
        }
    }
});
