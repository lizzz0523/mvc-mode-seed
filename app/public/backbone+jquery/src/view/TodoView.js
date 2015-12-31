import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default Backbone.View.extend({
    initialize: function () {
        this.list = new TodoList({
            el: this.$('.todo_list'),
            collection: this.collection
        });

        this.form = new TodoForm({
            el: this.$('.todo_form'),
            collection: this.collection
        });

        this.listenTo(this.form, 'add', this.add);
        this.listenTo(this.list, 'done', this.done);
        this.listenTo(this.list, 'dump', this.dump);


        this.collection.list();
    },

    add: function(text) {
        this.collection.todo(text);
    },

    done: function (id) {
        this.collection.done(id);
    },

    dump: function (id) {
        this.collection.dump(id);
    }
});