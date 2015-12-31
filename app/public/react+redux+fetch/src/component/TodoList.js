import TodoItem from './TodoItem';

export default React.createClass({
    render: function () {
        var { todos, doneTodo, destroyTodo } = this.props;

        return (
            <ul className="todo_list">
                {
                    todos.map(function (todo) {
                        return <TodoItem todo={ todo } doneTodo={ doneTodo } destroyTodo={ destroyTodo } />;
                    })
                }
            </ul>
        );
    }
})