category.controller('CategoryCtrl', ['$scope', 'Model', function ($scope, Model) {
    var Category = Model.create('admin/categories');

    Category.getList().then(function (categories) {
        $scope.categories = categories;
    });

    $scope.remove = function (category) {
        $scope.categories.remove(category);
    };

    var originalCategory = {};

    $scope.edit = function (category) {
        $scope.editingCategory = category;
        angular.copy(category, originalCategory);
    };

    $scope.cancelEdit = function (category) {
        angular.copy(originalCategory, category);
        $scope.editingCategory = null;
    };

    $scope.update = function (category) {
        // 校验
        if ($scope.editForm.$valid) {
            category.put().then(function () {
                category.edit = false;
            }, function (resp) {
                alert(resp.data[0]);
            });
        } else {
            // 报错信息
            _.any($scope.editForm.name.$error, function (v, k) {
                if (v) {
                    var error = {
                        required: '请填写分类名称',
                        minlength: '分类名称至少应2个字符'
                    }[k];
                    //showError(error);
                }
                return v;
            });
        }
    };

    // 动画
    $scope.anim = {leave: 'tr-animate-leave'};
}]);

/**
 * 添加分类的表单
 */
category.controller('CategoryAddCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.newCategory = {name: ''};

    $scope.add = function () {
        // 校验
        if ($scope.addForm.$valid) {
            $scope.$parent.anim.enter = 'tr-animate-enter';
            $scope.categories.create($scope.newCategory).then(function () {
                $scope.newCategory = {name: ''};
            }, function (resp) {
                showError(resp.data[0]);
            });
        } else {
            // 报错信息
            _.any($scope.addForm.name.$error, function (v, k) {
                if (v) {
                    var error = {
                        required: '请填写分类名称',
                        minlength: '分类名称至少应2个字符'
                    }[k];
                    showError(error);
                }
                return v;
            });
        }
    };

    $scope.hideError = function () {
        $scope.showError = false;
    };

    // 显示错误信息
    function showError(error) {
        $scope.error = error;
        $scope.showError = true;
        $timeout.cancel(showError.timer);
        showError.timer = $timeout($scope.hideError, 3000);
    }
}]);

category.controller('CategoryEditCtrl', ['$scope', function ($scope) {
    var originalCategory;

    $scope.init = function (category) {
        originalCategory = angular.copy(category);
    };
}]);