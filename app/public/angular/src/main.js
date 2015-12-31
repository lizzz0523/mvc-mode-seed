import utils from './service/utils';
import todos from './service/todos';
import todoCtrl from './controller/todoCtrl';

var app = angular.module('app', []);

app.factory('utils', utils);
app.factory('todos', todos);
app.controller('todoCtrl', todoCtrl);

angular.bootstrap(document.querySelector('#app'), ['app']);