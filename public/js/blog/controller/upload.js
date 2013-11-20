/**
 * 上传
 */
define(function(require, exports, module) {

    var Upload = ['$modal', function($modal) {

        return {
            open: function(text, templateUrl) {
                var modal = $modal.open({
                    templateUrl: 'blog/upload',
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