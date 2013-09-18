category.controller('CategoryCtrl', ['$scope', 'Model', '$timeout', function ($scope, Model, $timeout) {
    var Category = Model.create('admin/categories');

    Category.getList().then(function (categories) {
        $scope.categories = categories;
    });

    $scope.remove = function (category) {
            $scope.categories.remove(category);
    };
}]);

category.controller('CategoryAddCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.newCategory = {name: ''};

    var timer;
    function showError(resp) {
        $scope.error = resp.data[0];
        $scope.showError = true;
        $timeout.cancel(timer);
        timer = $timeout($scope.hideError, 3000);
    }

    $scope.add = function () {
        $scope.categories
            .create($scope.newCategory)
            .then(function () {
                $scope.newCategory = {name: ''};
            }, showError);
    };

    $scope.hideError = function () {
        $scope.showError = false;
    };
}]);