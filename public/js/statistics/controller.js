statistics.controller('StatisticsCtrl', ['$scope', 'Model', '$timeout', function ($scope, Model, $timeout) {
    var Category = Model.create('admin/categories');

//    $scope.posts = [
//        {"id": 190, "name": "111adf", "blog_count": 0, "created_at": "2013-09-30 15:21:12", "route": "admin/categories", "parentResource": null, "restangularCollection": false},
//        {"id": 191, "name": "asdfa", "blog_count": 0, "created_at": "2013-09-30 15:21:16", "route": "admin/categories", "parentResource": null, "restangularCollection": false}
//    ];
    $scope.posts = []
    $timeout(function (data) {
        $scope.posts=([
            {"id": 190, "name": "111adf", "blog_count": 0, "created_at": "2013-09-30 15:21:12", "route": "admin/categories", "parentResource": null, "restangularCollection": false},
            {"id": 191, "name": "asdfa", "blog_count": 0, "created_at": "2013-09-30 15:21:16", "route": "admin/categories", "parentResource": null, "restangularCollection": false},
            {"id": 193, "name": "xx", "blog_count": 0, "created_at": "2013-09-30 15:21:16", "route": "admin/categories", "parentResource": null, "restangularCollection": false}
        ]);
    }, 3000)

    $scope.remove = function () {
        $scope.posts.shift();
    };
}]);
