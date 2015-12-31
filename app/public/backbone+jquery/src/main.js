import TodoView from './view/TodoView';
import Todos from './model/Todos';

var todos = new Todos({}),

    todoView = new TodoView({
        el: '#todo',
        collection: todos
    });