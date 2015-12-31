export default [function () {
    var self = {};

    self.indexOf = function (arr, value) {
        var index = -1;

        arr.every(function (x, i) {
            if (x === value) {
                index = i;
                return false;
            }
        });

        return index;
    };

    self.without = function (arr, value) {
        var index = self.indexOf(arr, value);

        if (index !== -1) {
            arr.splice(index, 1);
        }

        return arr;
    };

    self.extend = function (dest) {
        var args = [].slice.call(arguments, 1);

        args.forEach(function (src) {
            angular.extend(dest, src);
        });

        return dest;
    }

    return self;
}];