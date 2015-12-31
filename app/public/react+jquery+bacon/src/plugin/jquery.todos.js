import TodoList from '../widget/TodoList';

var setting = {
        todos: []
    };

function todo(elem, options) {
    function done(id, done) {
        $(elem).trigger('done', {
            id: id,
            done: done
        });
    }

    function remove(id) {
        $(elem).trigger('destroy', {
            id: id
        });
    }

    ReactDOM.render(<TodoList todos={ options.todos } onDone={ done } onRemove={ remove } />, elem);
}

$.fn.todos = function (options) {
    options = $.extend({}, setting, options);

    return this.each(function () {
        todo(this, options);
    });
}