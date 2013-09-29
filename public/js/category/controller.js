category.controller('CategoryCtrl', ['$scope', 'Model', function ($scope, Model) {
    var Category = Model.create('admin/categories');

    Category.getList().then(function (categories) {
        $scope.categories = categories;
    });

    $scope.remove = function (category) {
        $scope.categories.remove(category);
    };

    $scope.edit = function (category) {
        $scope.editingCategory = category;
        angular.copy(category, $scope.originalCategory);
    };

    $scope.cancelEdit = function (category) {
        angular.copy($scope.originalCategory, category);
        $scope.editingCategory = null;
    };

    // 动画
    //$scope.anim = {leave: 'tr-animate-leave'};
}]);

/**
 * 添加分类的表单
 */
category.controller('CategoryAddCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.newCategory = {name: ''};

    formValid($scope, $timeout);

    $scope.add = function () {
        // 校验
        if ($scope.addForm.$valid) {
            //$scope.$parent.anim.enter = 'tr-animate-enter';
            $scope.categories.create($scope.newCategory).then(function () {
                $scope.newCategory = {name: ''};
            }, function (resp) {
                $scope.showValidError({remote: resp.data[0]});
            });
        } else {
            $scope.showValidError($scope.addForm.name.$error);
        }
    };
}]);

category.controller('CategoryEditCtrl', ['$scope', function ($scope, $timeout) {
    formValid($scope, $timeout);

    $scope.update = function (category) {
        // 校验
        if ($scope.editForm.$valid) {
            //$scope.$parent.anim.enter = 'tr-animate-enter';
            category.put().then(function () {
                $scope.$parent.editingCategory = null;
            }, function (resp) {
                $scope.showValidError({remote: resp.data[0]});
            });
        } else {
            $scope.showValidError($scope.editForm.name.$error);
        }
    };
}]);

// 表单校验的通用方法
var formValid = function ($scope, $timeout) {
    var VALID_ERR_MSG = {
        required: '请填写分类名称',
        minlength: '分类名称至少应2个字符'
    };

    $scope.hideValidError = function () {
        $scope.validError = null;
    };

    var promise;
    $scope.showValidError = function (error) {
        _.any(error, function (v, k) {
            if (v) {
                $scope.validError = VALID_ERR_MSG[k] || v;
                $timeout.cancel(promise);
                promise = $timeout($scope.hideValidError, 3000);
            }
            return v;
        });
    };
};