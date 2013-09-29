category.factory('CategoryForm', function ($timeout) {
    var Form = {};

    var VALID_ERR_MSG = {
        required: '请填写分类名称',
        minlength: '分类名称至少应2个字符'
    };

    Form.create = function (options) {
        var scope = options.scope;
        var form = options.form;
        var collection

        scope.submit = function () {
            // 校验
            if (form.$valid) {
                //$scope.$parent.anim.enter = 'tr-animate-enter';
                scope.categories.create($scope.newCategory).then(function () {
                    $scope.newCategory = {name: ''};
                }, function (resp) {
                    showError(resp.data[0]);
                });
            } else {
                // 报错信息

            }
        };

        scope.hideValidError = function () {
            scope.validError = null;
        };

        var promise;
        scope.showValidError = function (error) {
            _.any(error, function (v, k) {
                if (v) {
                    var error = VALID_ERR_MSG[k];
                    scope.validError = error;
                    $timeout.cancel(promise);
                    promise = $timeout(scope.hideError, 3000);
                }
                return v;
            });
        };
    };

    return Form;
});