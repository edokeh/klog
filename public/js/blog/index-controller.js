/**
 * 文章列表
 */
define(function(require, exports, module) {
    var IndexController = ['$scope', '$routeParams', 'Restangular', 'URL', function($scope, $routeParams, Restangular, URL) {
        $scope.statusMap = {
            '1': '已发布',
            '0': '草稿箱',
            '': '全部文章'
        };
        $scope.status = $scope.statusMap[$routeParams.status || ''];


        $scope.blogs = [];
        Restangular.all(URL.BLOG).getList({status: $routeParams.status}).then(function(blogs) {
            $scope.blogs = blogs;
            $scope.showBlog(blogs[0]);
        });

        $scope.showBlog = function(blog) {
            Restangular.one(URL.BLOG, blog.id).get().then(function(blog) {
                $scope.currBlog = blog;
            });
        };

        $scope.remove = function(blog) {
            $scope.blogs.remove(blog);
        };
    }];

    IndexController.template = 'blog/index';
    IndexController.title = '文章列表';

    module.exports = IndexController;
});