export default Backbone.Model.extend({
    parse: function (res) {
        if (res.ret === 0) {
            return res.data.todo;
        } else {
            return {};
        }
    },

    done: function () {
        var done = this.get('done');

        this.save({
            'done': !done
        });
    },

    dump: function () {
        this.destroy();
    }
});