import * as todoAction from '../action/todoAction';
import App from '../component/App';

function mapStateToProps(state) {
    var { todos } = state;

    return { todos };
}

function mapDispatchToProps(dispatch) {
    var { fetchTodo, createTodo, doneTodo, destroyTodo } = todoAction;

    return Redux.bindActionCreators({ fetchTodo, createTodo, doneTodo, destroyTodo }, dispatch);
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);