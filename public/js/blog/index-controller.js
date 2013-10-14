//admin.controller('BlogCtrl', ['$scope', '$routeParams', 'Blog', function ($scope, $routeParams, Blog) {
//    $scope.blogs = [];
//    $scope.status = $routeParams.status || '1';
//
//    Blog.getList({status: $scope.status}).then(function (blogs) {
//        $scope.blogs = blogs;
//    });
//
//    $scope.remove = function (blog) {
//        $scope.blogs.remove(blog);
//    };
//}]);

define(function (require, exports, module) {
    var IndexController = ['$scope', '$routeParams', 'Blog', function ($scope, $routeParams, Blog) {
        $scope.blogs = [];
        $scope.status = $routeParams.status || '1';

        Blog.getList({status: $scope.status}).then(function (blogs) {
            $scope.blogs = blogs;
        });

        $scope.remove = function (blog) {
            $scope.blogs.remove(blog);
        };
    }];

    IndexController.template = require('./index.html');

    module.exports = IndexController;
});