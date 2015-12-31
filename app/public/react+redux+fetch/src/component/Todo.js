import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default React.createClass({
    render: function () {
        var { todos, createTodo, doneTodo, destroyTodo } = this.props;

        return (
            <div className="todo">
                <TodoForm createTodo={ createTodo } />
                <TodoList todos={ todos } doneTodo={ doneTodo } destroyTodo={ destroyTodo } />
            </div>
        );
    }
});