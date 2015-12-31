import TodoItem from './TodoItem';

export default Backbone.View.extend({
    events: {
        'click [data-done]': 'done',
        'click [data-dump]': 'dump'
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'add', this.insert);
    },

    render: function () {
        var self = this;

        this.items = this.collection.map(function (model) {
            var item = new TodoItem({
                model: model
            });

            item.render();
            item.append(self.el);

            return item;
        });
    },

    insert: function (model) {
        var item = new TodoItem({
                model: model
            });

        item.render();
        item.append(this.el);

        this.items.push(item);
    },

    done: function (event) {
        event.preventDefault();

        this.trigger('done', $(event.currentTarget).data('done'));
    },

    dump: function (event) {
        event.preventDefault();

        this.trigger('dump', $(event.currentTarget).data('dump'));
    }
});