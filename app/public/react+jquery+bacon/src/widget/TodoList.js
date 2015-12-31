import TodoItem from './TodoItem';

export default React.createClass({
    render: function () {
        var { todos, onDone, onRemove } = this.props;

        return (
            <ul className="todo_list">
                {
                    todos.map(function (todo) {
                        return <TodoItem todo={ todo } onDone={ onDone } onRemove={ onRemove } />;
                    })
                }
            </ul>
        );
    }
})