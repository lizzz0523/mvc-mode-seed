export default React.createClass({
    getInitialState: function () {
        return {
            text: ''
        }
    },

    render: function () {
        return (
            <form className="todo_form">
                <input type="text" value={ this.state.text } onChange={ this._handleInput } ref="input" />
                <button type="button" onClick={ this._handleAdd }>添加</button>
            </form>
        );
    },

    _handleInput: function (event) {
        var input = ReactDOM.findDOMNode(this.refs.input);

        this.setState({
            text: input.value
        });
    },

    _handleAdd: function (event) {
        var text = this.state.text;

        event.preventDefault();

        this.setState({
            text: ''
        });

        this.props.createTodo(text);
    }
});