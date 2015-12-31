export default Backbone.View.extend({
    tagName: 'li',
    className: 'todo_item',

    template: _.template($('#itemTmpl').html(), {
        variable: 'item'
    }),

    initialize: function () {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.destroy);
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    },

    append: function (list) {
        this.$el.appendTo(list);
    },

    destroy: function () {
        this.$el.off().remove();
    }
});