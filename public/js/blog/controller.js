blog.controller('BlogCtrl', ['$scope', '$routeParams', 'Model', function ($scope, $routeParams, Model) {
    $scope.status = $routeParams.status;

    var Blog = Model.create('admin/blogs');

    Blog.getList({status: $scope.status}).then(function (blogs) {
        $scope.blogs = blogs;
    });

    $scope.remove = function (blog) {
        $scope.blogs.remove(blog);
    };
}]);