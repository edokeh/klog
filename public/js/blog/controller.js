blog.controller('BlogCtrl', ['$scope', '$routeParams', 'Model', function ($scope, $routeParams, Model) {
    var Blog = Model.create('admin/blogs');

    $scope.blogs = [];
    $scope.status = $routeParams.status || '1';

    Blog.getList({status: $scope.status}).then(function (blogs) {
        $scope.blogs = blogs;
    });

    $scope.remove = function (blog) {
        $scope.blogs.remove(blog);
    };
}]);