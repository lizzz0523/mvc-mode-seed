import {LIST_TODO, ADD_TODO, UPDATE_TODO, REMOVE_TODO} from '../action/todoAction';

function extend(x, y) {
    var k;

    for (k in y) {
        if (y.hasOwnProperty(k) && !x.hasOwnProperty(k)) {
            x[k] = y[k]
        }
    }

    return x;
}

function find(arr, fn) {
    var i = -1,
        len = arr.length;

    while (++i < len) {
        if (fn(arr[i], i, arr)) {
            return i;
        }
    }

    return -1;
}

function insert(arr, x) {
    return arr.slice(0).concat(x);
}

function replace(arr, x, k) {
    var i = find(arr, function (v) { return v[k] === x[k] });

    if (i === -1) {
        return arr;
    }

    return arr.slice(0, i).concat(extend(x, arr[i])).concat(arr.slice(i + 1));
}

function remove(arr, x, k) {
    var i = find(arr, function (v) { return v[k] === x[k] });

    if (i === -1) {
        return arr;
    }

    return arr.slice(0, i).concat(arr.slice(i + 1));
}

export function todos(state, action) {
    if (state === void 0) {
        return [];
    }

    switch (action.type) {
        case LIST_TODO:

        return action.todos;

        case ADD_TODO:

        return insert(state, action.todo);

        case UPDATE_TODO:

        return replace(state, action.todo, 'id');

        case REMOVE_TODO:

        return remove(state, action.todo, 'id');

        default:

        return state;
    }
};