import { Todo } from "../classes";
import { todoList } from '../index.js';


//HTML References
const divTodoList           = document.querySelector('.todo-list');
const txtInput              = document.querySelector('.new-todo');
const clearCompletedTodos   = document.querySelector('.clear-completed');
const filtersTodos          = document.querySelector('.filters');
const ancleFilters          = document.querySelectorAll('.filtro');

export const createTodoHTML = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completed) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}

// Events
txtInput.addEventListener('keyup', ( event ) => {
    if (event.keyCode === 13 && txtInput.value.trim() ) {
        //Init new Todo
        const newTodo = new Todo( txtInput.value );
        //Add Todo in List
        todoList.newTodo( newTodo );
        //Create Todo in HTML
        createTodoHTML( newTodo );
        //Clean Input
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( e ) => {
    const elementName   = e.target.localName; // Input, Buttom, Label
    const todoElement   = e.target.parentElement.parentElement;
    const todoId        = todoElement.getAttribute('data-id');

    if (elementName.includes('input')) {
        todoList.completeTodo( todoId );
        todoElement.classList.toggle('completed');
    } else if (elementName.includes('button')) {
        todoList.deleteTodo( todoId );
        divTodoList.removeChild( todoElement );
    }
});

clearCompletedTodos.addEventListener('click', () => {
    todoList.deleteCompletesTodo();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const element = divTodoList.children[i];
        if (element.classList.contains('completed')) {
            divTodoList.removeChild(element);
        }
    }
});

filtersTodos.addEventListener('click', (e) => {
    console.log(e.target.text);
    const filter = e.target.text;
    if (!filter) { return; }
    ancleFilters.forEach( element => element.classList.remove('selected') );
    e.target.classList.add('selected');
    for( const element of divTodoList.children ) {
        element.classList.remove('hidden');
        const completed = element.classList.contains('completed');
        switch( filter ) {
            case 'Pendientes':
                if( completed ) {
                    element.classList.add('hidden');
                }
                break;
            case 'Completados':
                if( !completed ) {
                    element.classList.add('hidden');
                }
                break;
        }
    }
});