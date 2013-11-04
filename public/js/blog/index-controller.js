/**
 * 文章列表
 */
define(function(require, exports, module) {
    var IndexController = ['$scope', '$routeParams', 'REST', 'Confirm', function($scope, $routeParams, REST, confirm) {
        $scope.statusMap = {
            '1': '已发布',
            '0': '草稿箱',
            '': '全部文章'
        };
        $scope.status = $scope.statusMap[$routeParams.status || ''];


        $scope.blogs = [];
        REST.BLOG.getList({status: $routeParams.status}).then(function(blogs) {
            $scope.blogs = blogs;
            $scope.showBlog(blogs[0]);
        });

        $scope.showBlog = function(blog) {
            REST.BLOG.get(blog.id).then(function(blog) {
                $scope.currBlog = blog;
            });
        };

        $scope.remove = function(blog) {
            confirm.open('确定要删除“' + blog.title + '”？', 'blog/confirm').then(function() {
                blog.remove().then(function() {
                    $scope.blogs = _.without($scope.blogs, blog);
                });
            });
        };
    }];

    IndexController.template = 'blog/index';
    IndexController.title = '文章列表';

    module.exports = IndexController;
});