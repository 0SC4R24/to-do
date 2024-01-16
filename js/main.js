async function fetchData(url) {
    try {
        const response = await fetch(url, { method: 'GET' });
        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
}

function deleteTodo(id) {
    const todo = document.getElementById(id);
    todo.remove();
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(todo => todo.id != id);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function completeTodo(id) {
    const todo = document.getElementById("completed-"+id);
    todo.innerHTML = todo.innerHTML == "true" ? "false" : "true";
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => {
        if (todo.id == id) {
            todo.completed = !todo.completed;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    let completeButton = document.getElementById("completeButton-"+id);
    completeButton.innerHTML = completeButton.innerHTML == "Complete" ? "Uncomplete" : "Complete";
    completeButton.className = completeButton.className == "btn btn-success" ? "btn btn-warning" : "btn btn-success";
}

function addTodo(todo) {
    const todos = document.getElementById('todos');

    let todoItem = `
    <tr id="${todo.id}">
        <td>${todo.id}</td>
        <td>${todo.userId}</td>
        <td>${todo.title}</td>
        <td id="completed-${todo.id}">${todo.completed}</td>
        <td>
            ${todo.completed ? 
            `<button id="completeButton-${todo.id}" onclick="completeTodo(${todo.id})" class="btn btn-warning">Uncomplete</button>` :
            `<button id="completeButton-${todo.id}" onclick="completeTodo(${todo.id})" class="btn btn-success">Complete</button>`}
            <button onclick="deleteTodo(${todo.id})" class="btn btn-danger">Delete</button>
        </td>
    </tr>`;

    todos.innerHTML += todoItem;

    let todosFromStorage = JSON.parse(localStorage.getItem('todos'));
    todosFromStorage.push(todo);
    localStorage.setItem('todos', JSON.stringify(todosFromStorage));
}

function addTodoFromLoad(todo) {
    const todos = document.getElementById('todos');

    let todoItem = `
    <tr id="${todo.id}">
        <td>${todo.id}</td>
        <td>${todo.userId}</td>
        <td>${todo.title}</td>
        <td id="completed-${todo.id}">${todo.completed}</td>
        <td>
            ${todo.completed ? 
            `<button id="completeButton-${todo.id}" onclick="completeTodo(${todo.id})" class="btn btn-warning">Uncomplete</button>` :
            `<button id="completeButton-${todo.id}" onclick="completeTodo(${todo.id})" class="btn btn-success">Complete</button>`}
            <button onclick="deleteTodo(${todo.id})" class="btn btn-danger">Delete</button>
        </td>
    </tr>`;

    todos.innerHTML += todoItem;
}

async function getTodosFromFetch() {
    let todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
    
    let firstTenTodos = todos.slice(0, 200);
    localStorage.setItem('todos', JSON.stringify(firstTenTodos));
    firstTenTodos.forEach(todo => {
        addTodoFromLoad(todo);
    });
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(todo => {
        addTodoFromLoad(todo);
    });
}