const todoList = [];
function renderTodo(){
    let todoListHTML = '';
    let html = '';
    for(let i=0; i<todoList.length; i++){
        todoObject = todoList[i];
        const {name, dueDate} = todoObject;
        html += `
        <p>
            ${name} ${dueDate}
            <button onclick=
                'todoList.splice(${i},1);
                renderTodo();'>
                Delete
            </button>
        </p>
        `
        todoListHTML = html;
    }
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
    console.log(todoListHTML);
}
function addTodo(){
    const inputElement = document.querySelector('.js-todo-input');
    const dateElement = document.querySelector('.js-date-input');
    const name = inputElement.value;
    const dueDate = dateElement.value;
    todoList.push({name, dueDate});
    console.log(todoList);
    renderTodo();
    inputElement.value = '';
}