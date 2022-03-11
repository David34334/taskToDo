import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        this.loadLocalStorage();
    }

    newTodo( todo ) {
        this.todos.push( todo );
        this.saveLocalStorage();
    }

    deleteTodo( id ) {
        let idNumber = Number(id);
        this.todos = this.todos.filter( data => data.id !== idNumber );
        this.saveLocalStorage();
    }

    completeTodo( id ) {
        let idNumber = Number(id);
        this.todos.map(data => {
            if (data.id === idNumber) {
                data.completed = !data.completed;
                this.saveLocalStorage();
            }
        });
    }

    deleteCompletesTodo() {
        this.todos = this.todos.filter( data => !data.completed );
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadLocalStorage() {
        this.todos = (localStorage.getItem('todo')) ? this.todos = JSON.parse(localStorage.getItem('todo')) : this.todos = [];
        this.todos = this.todos.map( Todo.fromJson );
    }

}