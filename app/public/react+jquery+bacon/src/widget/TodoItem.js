export default React.createClass({
    render: function () {
        return (
            <li className="todo_item">
                <a className="todo_btn-done" href="javascript:;" onClick={ this._handleDone }>
                    <i className={ 'fa fa-' + (this.props.todo.done ? 'check-square' : 'square') }></i>
                </a>
                <span className={ this.props.todo.done ? 'todo_done' : '' }>{ this.props.todo.text }</span>
                <a className="todo_btn-dump" href="javascript:;" onClick={ this._handleRemove }>
                    <i className="fa fa-trash"></i>
                </a>
            </li>
        );
    },

    _handleDone: function (event) {
        var { id, done } = this.props.todo;

        event.preventDefault();

        this.props.onDone(id, !done);
    },

    _handleRemove: function (event) {
        var { id } = this.props.todo;

        event.preventDefault();

        this.props.onRemove(id);
    }
});