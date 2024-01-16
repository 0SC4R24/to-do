document.getElementById('addButton').addEventListener('click', function() {
    var task = document.getElementById('taskInput').value;
    var userId = document.getElementById('userIdInput').value;

    var todo = {
        id: Math.floor(Math.random() * 100000000),
        title: task,
        userId: userId,
        completed: false
    };

    addTodo(todo);
});

document.getElementById('search-bar').addEventListener('keyup', function(e) {
    var search = document.getElementById('search-bar').value;
    var todos = JSON.parse(localStorage.getItem('todos'));
    var filteredTodos = todos.filter(todo => todo.title.includes(search));
    document.getElementById('todos').innerHTML = "";
    filteredTodos.forEach(todo => {
        addTodoFromLoad(todo);
    }); 
});