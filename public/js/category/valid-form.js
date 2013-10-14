define(function (require, exports, module) {

    // 表单校验的通用方法
    var ValidForm = ['$timeout', function ($timeout) {
        var VALID_ERR_MSG = {
            required: '请填写分类名称',
            minlength: '分类名称至少应2个字符'
        };

        return function ($scope) {
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
    }];

    return ValidForm;
});