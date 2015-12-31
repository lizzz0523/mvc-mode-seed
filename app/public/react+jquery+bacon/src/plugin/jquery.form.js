var setting = {};

// 用于拦截form表单的提交，并收集表单中的数据，由于下一步的校验
function form(elem, options) {
    var $form = $(elem);

    $form.on('submit', function (event) {
        var params = {};

        event.preventDefault();

        $form.find('[name]').each(function () {
            var name = this.name,
                value = this.value,
                type = this.type,
                checked = this.checked,
                nodeName = this.nodeName.toLowerCase();

            if (!type && (nodeName === 'textarea' || nodeName === 'select')) {
                type = 'text';
            }

            if (!checked && (type === 'radio' || type === 'checkbox')) {
                return;
            }

            if (name in params) {
                if (!$.isArray(params[name])) {
                    params[name] = [params[name]];
                }

                params[name].push(value);
            } else {
                params[name] = value;
            }
        });

        $form.trigger('success', params);
    });
}

$.fn.form = function (options) {
    options = $.extend({}, setting, options);

    return this.each(function () {
        form(this, options);
    });
};