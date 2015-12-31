export default ['$http', function ($http) {
    var cgi = 'http://localhost:8089/cgi/todo',
        self = {};

    self.list = function () {
        return $http.get(cgi);
    };

    self.add = function (text, done) {
        return $http.post(cgi, {
            text: text,
            done: done
        });
    };

    self.done = function (id, done) {
        return $http.put(cgi + '/' + id, {
            done: done
        });
    };

    self.remove = function (id) {
        return $http.delete(cgi + '/' + id);
    };

    return self;
}];