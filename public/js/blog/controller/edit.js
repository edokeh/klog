/**
 * 文章列表
 */
define(function(require, exports, module) {

    var NewController = ['$scope', 'Blog', 'BlogForm', '$routeParams', function($scope, Blog, BlogForm, $routeParams) {

        $scope.blog = Blog.get({id: $routeParams.id});

        BlogForm.initScope($scope);

    }];

    NewController.template = 'blog/form';
    NewController.title = '写文章';

    module.exports = NewController;
});