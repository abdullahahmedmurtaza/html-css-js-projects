const todoList = ['wash dishes','make dinner'];
function renderHTML(){
    let todoListHTML = '';
    for (let i = 0; i < todoList.length; i++){
        const todo = todoList[i];
        html = `<p>${todo}</p>`;
        todoListHTML += html;
}

console.log(todoListHTML);
document.querySelector('.js-todo-div').innerHTML = todoListHTML;
}


function addTodo(){
    const inputElement = document.querySelector('.js-todo-input');
    const name = inputElement.value;
    todoList.push(name);
    console.log(todoList);
    inputElement.value = '';
    renderHTML();
}