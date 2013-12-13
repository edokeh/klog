/**
 * 上传
 */
define(function(require, exports, module) {

    var Upload = ['$scope', '$modalInstance', '$http', 'BlogAttach' , function($scope, $modalInstance, $http, BlogAttach) {
        $scope.modal = $modalInstance;
        $scope.attaches = [];

        $scope.upload = function() {
            $('#sb').click();
        };

        $scope.doUpload = function(files) {
            _.each(files, function(file) {
                var attach = BlogAttach.create({file: file});
                $scope.attaches.push(attach);
            });
        };

        $scope.remove = function(attach) {
            attach.$remove(function() {
                $scope.attaches = _.without($scope.attaches, attach);
            });
        };

        $scope.do = function(files) {
            console.log(files);
        };
    }];

    function upload(url, file, $http) {
        var config = {
            url: url,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': false
            },
            transformRequest: function() {

            }
        };

        var promise = $http(config);

        return promise;
    }

    module.exports = Upload;
});