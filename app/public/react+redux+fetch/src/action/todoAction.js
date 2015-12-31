import fetch from 'isomorphic-fetch';

export const LIST_TODO = 'LIST_TODO';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

var cgi = 'http://localhost:8089/cgi/todo';

export function fetchTodo() {
    return function (dispatch) {
        fetch(cgi)
        .then(function (stream) {
            return stream.json();
        })
        .then(function (res) {
            return dispatch(listTodo(res.data.list));
        });
    };
}

export function listTodo(todos) {
    return {
        type: LIST_TODO,
        todos: todos
    };
};

export function createTodo(text) {
    return function (dispatch) {
        fetch(cgi, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                done: false,
            })
        })
        .then(function (stream) {
            return stream.json();
        })
        .then(function (res) {
            return dispatch(addTodo(res.data.todo));
        });
    };
}

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo: todo
    };
}

export function doneTodo(id, done) {
    return function (dispatch) {
        fetch(cgi + '/' + id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                done: done,
            })
        })
        .then(function (stream) {
            return stream.json();
        })
        .then(function (res) {
            return dispatch(updateTodo(res.data.todo));
        });
    };
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO,
        todo: todo
    };
}

export function destroyTodo(id) {
    return function (dispatch) {
        fetch(cgi + '/' + id, {
            method: 'delete'
        })
        .then(function (stream) {
            return stream.json();
        })
        .then(function (res) {
            return dispatch(removeTodo({id: id}));
        });
    };
}

export function removeTodo(todo) {
    return {
        type: REMOVE_TODO,
        todo: todo
    };
}