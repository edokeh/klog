/**
 * 文章列表
 */
define(function(require, exports, module) {
    var marked = require('marked');

    var IndexController = ['$scope', '$routeParams', 'Blog', 'Confirm', 'Flash', function($scope, $routeParams, Blog, confirm, Flash) {

        $scope.STATUS = Blog.STATUS;
        $scope.currStatus = Blog.getStatus($routeParams.status);

        $scope.blogs = Blog.query({status: $routeParams.status}, function() {
            if ($scope.blogs.length > 0) {
                var tmpId = Flash.tmp();
                var blog = tmpId ? _.findWhere($scope.blogs, {id: tmpId}) : $scope.blogs[0];
                $scope.showBlog(blog);
            }
        });

        $scope.showBlog = function(blog) {
            $scope.currBlog = blog;
            blog.$get({detail: true});
        };

        $scope.remove = function(blog) {
            //confirm.open('确定要删除“' + blog.title + '”？', 'blog/confirm').then(function() {
            blog.$remove(function() {
                $scope.blogs = _.without($scope.blogs, blog);
            });
            //});
        };
    }];

    IndexController.template = 'blog/index';
    IndexController.title = '文章列表';

    module.exports = IndexController;
});