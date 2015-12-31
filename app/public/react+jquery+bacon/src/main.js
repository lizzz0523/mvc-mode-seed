import { insert, replace, remove } from './common/utils';
import './plugin/jquery.form';
import './plugin/jquery.todos';

var cgi = 'http://localhost:8089/cgi/todo';

// 把点击done按钮事件转换成stream
var onDone = $('#todoList').asEventStream('done', function (event, data) {
    return {
        type: 'done',
        data: data
    };
});

// 把点击destory按钮事件转换成stream
var onDestroy = $('#todoList').asEventStream('destroy', function (event, data) {
    return {
        type: 'destroy',
        data: data
    };
});

// 把表单提交事件交转换成stream
var onCreate = $('#todoForm').form().asEventStream('success', function (event, data) {
    return {
        type: 'create',
        data: data
    };
});

function load(stream) {
    return stream.merge(Bacon.once({
        type: 'load'
    }));
}

// 拉取数据列表
function fetch() {
    var xhr = $.ajax({
            url: cgi,
            type: 'GET',
            dataType: 'json'
        });

    // 转换成stream
    return load(Bacon.fromPromise(xhr.promise()).map(function (res) {
        return {
            type: 'list',
            data: res.data
        };
    }));
}

// 新增数据项
function create(text, done) {
    var xhr = $.ajax({
            url: cgi,
            type: 'POST',
            dataType: 'json',
            data: {
                text: text,
                done: done
            }
        });

    // 转换成stream
    return load(Bacon.fromPromise(xhr.promise()).map(function (res) {
        return {
            type: 'insert',
            data: res.data
        };
    }));
}

// 更新数据项
function done(id, done) {
    var xhr = $.ajax({
            url: cgi + '/' + id,
            type: 'PUT',
            dataType: 'json',
            data: {
                done: done
            }
        });

    // 转换成stream
    return load(Bacon.fromPromise(xhr.promise()).map(function (res) {
        return {
            type: 'update',
            data: res.data
        };
    }));
}

// 删除数据项
function destroy(id) {
    var xhr = $.ajax({
            url: cgi + '/' + id,
            type: 'DELETE',
            dataType: 'json'
        });

    // 转换成stream
    return load(Bacon.fromPromise(xhr.promise()).map(function (res) {
        return {
            type: 'remove',
            data: {
                todo: {id: id}
            }
        };
    }));
}

function render(store) {
    $('#loading')
    .toggle(store.loading);

    $('#todoForm')
    .trigger('reset');

    $('#todoList')
    .todos({
        todos: store.todos
    });
}

fetch()
.merge(onCreate)
.merge(onDone)
.merge(onDestroy)
.flatMapLatest(function (action) {
    // 异步拦截器
    switch (action.type) {
        case 'create':
            return create(action.data.text, false);
        case 'done':
            return done(action.data.id, action.data.done);
        case 'destroy':
            return destroy(action.data.id);
        default:
            return Bacon.once(action);
    }
})
.scan({
    loading: false,
    todos: []
}, function (store, action) {
    // 数据reducer
    switch (action.type) {
        case 'load':
            store.loading = true;
            break;
        case 'list':
            store.loading = false;
            store.todos = action.data.list;
            break;
        case 'insert':
            store.loading = false;
            store.todos = insert(store.todos, action.data.todo);
            break;
        case 'update':
            store.loading = false;
            store.todos = replace(store.todos, action.data.todo, 'id');
            break;
        case 'remove':
            store.loading = false;
            store.todos = remove(store.todos, action.data.todo, 'id');
            break;
    }

    return store;
})
.onValue(function (store) {
    render(store);
});