define(function (require, exports, module) {

    var EditController = ['$scope', 'ValidCategoryForm', function ($scope, ValidCategoryForm) {
        ValidCategoryForm($scope);

        $scope.update = function (category) {
            // 校验
            if ($scope.editForm.$valid) {
                category.put().then(function () {
                    $scope.edit.current = null;  // prototype 继承
                }, function (resp) {
                    $scope.showValidError({remote: resp.data[0]});
                });
            } else {
                $scope.showValidError($scope.editForm.name.$error);
            }
        };
    }];

    module.exports = EditController;
});