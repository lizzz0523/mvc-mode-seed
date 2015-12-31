var express = require('express'),
    router = express.Router();

var todo = require('../controller/todo');

router.param('id', function (req, res, next, id) {
    req.rest = {
        id: +id
    };
    next();
})

router.get('/', function (req, res) {
    todo.list(req, res);
});

router.post('/', function (req, res) {
    todo.add(req, res);
});

router.get('/:id', function (req, res) {
    todo.get(req, res);
});

router.put('/:id', function (req, res) {
    todo.done(req, res);
});

router.delete('/:id', function (req, res) {
    todo.remove(req, res);
});

module.exports = router;