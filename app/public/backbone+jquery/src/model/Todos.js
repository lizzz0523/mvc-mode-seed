import Todo from './Todo';

export default Backbone.Collection.extend({
    url: 'http://localhost:8089/cgi/todo',

    model: Todo,

    parse: function (res) {
        if (res.ret === 0) {
            return res.data.list.map(function (todo) {
                return _.extend({}, res, {
                    data: {
                        todo: todo
                    }
                });
            });
        } else {
            return [];
        }
    },

    list: function () {
        this.fetch({
            reset: true
        });
    },

    todo: function (text) {
        this.create({
            text: text,
            done: false
        }, {
            wait: true
        });
    },

    done: function (id) {
        this.get(id).done();
    },

    dump: function (id) {
        this.get(id).dump();
    }
})