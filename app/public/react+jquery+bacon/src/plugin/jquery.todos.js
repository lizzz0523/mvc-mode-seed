import TodoList from '../widget/TodoList';

var setting = {
        todos: []
    };

function todo(elem, options) {
    function done(id, done) {
        // 点击完成按钮，对外抛出自定义done事件
        $(elem).trigger('done', {
            id: id,
            done: done
        });
    }

    function remove(id) {
        // 点击清除按钮，对外抛出自定义destroy事件
        $(elem).trigger('destroy', {
            id: id
        });
    }

    // 在插件内部调用react，来解决复杂组件的dom操作问题
    ReactDOM.render(<TodoList todos={ options.todos } onDone={ done } onRemove={ remove } />, elem);
}

$.fn.todos = function (options) {
    options = $.extend({}, setting, options);

    return this.each(function () {
        todo(this, options);
    });
}