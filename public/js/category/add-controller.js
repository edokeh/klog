define(function (require, exports, module) {
    var AddController = ['$scope', 'ValidCategoryForm', function ($scope, ValidCategoryForm) {
        $scope.newCategory = {name: '', isNew: true};

        ValidCategoryForm($scope);

        $scope.add = function () {
            // 校验
            if ($scope.addForm.$valid) {
                //$scope.$parent.anim.enter = 'tr-animate-enter';
                $scope.categories.create($scope.newCategory).then(function () {
                    $scope.newCategory = {name: '', isNew: true};
                }, function (resp) {
                    $scope.showValidError({remote: resp.data[0]});
                });
            } else {
                $scope.showValidError($scope.addForm.name.$error);
            }
        };
    }];

    module.exports = AddController;
});