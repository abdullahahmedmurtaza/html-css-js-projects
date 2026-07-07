const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveTodo(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
renderTodo();
function renderTodo(){
    let todoListHTML = '';
    let html = '';
    for(let i=0; i<todoList.length; i++){
        todoObject = todoList[i];
        const {name, dueDate} = todoObject;
        html += `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick=
            'todoList.splice(${i},1);
            renderTodo();
            saveTodo();' class="delete-todo-button">
            Delete
        </button>
        `
        todoListHTML = html;
    }
    document.querySelector('.js-todo-div').innerHTML = todoListHTML;
}
function addTodo(){
    const inputElement = document.querySelector('.js-todo-input');
    const dateElement = document.querySelector('.js-date-input');
    const name = inputElement.value;
    const dueDate = dateElement.value;
    todoList.push({name, dueDate});
    saveTodo();
    renderTodo();
    inputElement.value = '';
}