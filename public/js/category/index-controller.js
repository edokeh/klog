define(function (require, exports, module) {
    var IndexController = ['$scope', 'Model', function ($scope, Model) {
        var Category = Model.create('admin/categories');

        $scope.categories = [];
        $scope.fetching = true;

        Category.getList().then(function (categories) {
            $scope.categories = categories;
            $scope.fetching = false;
        });

        // 删除
        $scope.remove = function (category) {
            $scope.categories.remove(category);
        };

        // 修改与取消修改
        $scope.edit = {};

        $scope.edit = function (category) {
            $scope.cancelEdit($scope.edit.current);
            $scope.edit.current = category;
            $scope.edit.original = angular.copy(category);
        };

        $scope.cancelEdit = function (category) {
            angular.copy($scope.edit.original, category);
            $scope.edit.current = null;
        };
    }];

    IndexController.template = require('./index.html');

    module.exports = IndexController;
});