blog.controller('BlogCtrl', ['$scope', 'Blog', '$routeParams', function ($scope, Blog, $routeParams) {
    $scope.status = $routeParams.status || '1';

    Blog.getList({status: $scope.status}).then(function (blogs) {
        $scope.blogs = blogs;
    });

    $scope.remove = function (blog) {
        $scope.blogs.remove(blog);
    };
}]);