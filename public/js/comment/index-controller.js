define(function(require, exports, module) {
    var IndexController = ['$scope', '$routeParams', 'Restangular', 'URL', function($scope, $routeParams, Restangular, URL) {
    }];

    IndexController.template = require('./index.html');
    IndexController.title = '评论';

    module.exports = IndexController;
});