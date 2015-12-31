var _ = require('lodash');

var todoId = 1,

    todos = [{
        id: todoId++,
        text: 'hello world',
        done: false
    }];

exports.list = function (req, res) {
    res.json({
        ret: 0,
        data: {
            list: todos
        },
        msg: ''
    });
};

exports.add = function (req, res) {
    var todo = {
            id: todoId++,
            text: req.body.text,
            done: req.body.done
        };

    if (String(todo.done).match(/^true|false$/)) {
        todo.done = todo.done === 'true';
    } else {
        todo.done = !!todo.done;
    }

    todos.push(todo);

    res.json({
        ret: 0,
        data: {
            todo: todo
        },
        msg: ''
    });
};

exports.done = function (req, res) {
    var todo = _.findWhere(todos, {id: req.rest.id});

    todo.done = !todo.done;

    res.json({
        ret: 0,
        data: {
            todo: todo
        },
        msg: ''
    });
};

exports.remove = function (req, res) {
    var index = _.findIndex(todos, {id: req.rest.id});

    if (index !== -1) {
        todos.splice(index, 1);
    }

    res.json({
        ret: 0,
        data: {

        },
        msg: ''
    });
};