page.controller('PageCtrl', ['$scope', '$routeParams', 'Model', function ($scope, $routeParams, Model) {
    var Page = Model.create('admin/pages');

    $scope.pages = [];

    Page.getList().then(function (pages) {
        $scope.pages = pages;
    });

    $scope.remove = function (page) {
        $scope.pages.remove(page);
    };
}]);

