/**
 * 文章列表
 */
define(function(require, exports, module) {

    var EditController = ['$scope', 'Blog', 'BlogForm', '$routeParams', function($scope, Blog, BlogForm, $routeParams) {

        $scope.blog = Blog.get({id: $routeParams.id});

        BlogForm.initScope($scope);

    }];

    EditController.templateUrl = 'blog/form';
    EditController.title = '写文章';

    module.exports = {'blogEdit.edit': EditController};
});