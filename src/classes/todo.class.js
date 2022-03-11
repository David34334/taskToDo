

export class Todo {

    static fromJson( { tarea, id, completed, dateCreated } ) {
        const tempTodo = new Todo( tarea);
        tempTodo.id             = id;
        tempTodo.completed      = completed;
        tempTodo.dateCreated    = dateCreated;
        return tempTodo;
    }

    constructor( tarea ) {
        this.tarea          = tarea;
        this.id             = new Date().getTime();
        this.completed      = false;
        this.dateCreated    = new Date();
    }

}