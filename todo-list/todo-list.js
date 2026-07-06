const todoList = [];
function renderTodo(){
    let todoListHTML = '';
    let html = '';
    for(let i=0; i<todoList.length; i++){
        todo = todoList[i];
        html += `
        <p>
            ${todo}
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
    todoList.push(inputElement.value);
    console.log(todoList);
    renderTodo();
    inputElement.value = '';
}