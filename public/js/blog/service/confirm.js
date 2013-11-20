/**
 * 确认
 */
define(function(require, exports, module) {

    var Confirm = ['$modal', function($modal) {

        return {
            open: function(text, templateUrl) {
                var modal = $modal.open({
                    templateUrl: templateUrl,
                    controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                        $scope.text = text;
                        $scope.modal = $modalInstance;
                    }]
                });
                return modal.result;
            }
        };
    }];

    module.exports = Confirm;
});