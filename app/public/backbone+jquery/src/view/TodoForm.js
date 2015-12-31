export default Backbone.View.extend({
    events: {
        'submit': 'submit'
    },

    initialize: function () {
        this.listenTo(this.collection, 'sync', this.reset);
    },

    submit: function (event) {
        event.preventDefault();

        this.trigger('add', this.$('[name=text]').val());
    },

    reset: function () {
        this.$('[name]:text').val('');
    }
});