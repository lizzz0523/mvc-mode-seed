import * as todoReducer from './reducer/todoReducer';
import AppConnect from './container/AppConnect';

var todoApp = Redux.combineReducers(todoReducer),
    todoStore = Redux.applyMiddleware(ReduxThunk.thunkMiddleware)(Redux.createStore)(todoApp);

// start
ReactDOM.render(
    <ReactRedux.Provider store={ todoStore }>
        <AppConnect />
    </ReactRedux.Provider>,
    document.querySelector('#app')
);