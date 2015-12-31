export default ['$scope', 'todos', 'utils', function ($scope, todos, utils) {
    $scope.todos = []
    $scope.text = '';

    $scope.done = function (todo) {
        todos.done(todo.id, !todo.done).then(function (res) {
            res = res.data;

            if (res.ret === 0) {
                todo = utils.extend(todo, res.data.todo);
            }
        });
    };

    $scope.remove = function (todo) {
        todos.remove(todo.id).then(function (res) {
            res = res.data;

            if (res.ret === 0) {
                $scope.todos = utils.without($scope.todos, todo);
            }
        });
    };

    $scope.add = function (text) {
        todos.add(text, false).then(function (res) {
            res = res.data;

            if (res.ret === 0) {
                $scope.todos.push(res.data.todo);
                $scope.text = '';
            }
        });
    };

    todos.list().then(function (res) {
        res = res.data;

        if (res.ret === 0) {
            $scope.todos = res.data.list;
        } else {
            $scope.todos = [];
        }
    });
}];