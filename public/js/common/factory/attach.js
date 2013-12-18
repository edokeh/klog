/**
 * Blog
 */
define(function(require, exports, module) {
    var angular = require('angularjs');

    module.exports = {
        'Attach': ['$rootScope', '$q', '$resource', '$http', function($rootScope, $q, $resource, $http) {
            var UploadAttach = $resource('/admin/attaches/:id.json', {id: '@id'}, {});

            // 创建，因为要获取上传进度，只能自己重写
            UploadAttach.create = function(data, success, error) {
                var value = new UploadAttach(data);

                var httpConfig = {
                    headers: {'Content-Type': undefined},
                    url: '/admin/attaches.json',
                    method: 'POST',
                    data: data,
                    transformRequest: function(data) {
                        var formData = new FormData();
                        formData.append('file', data.file, data.file.name);
                        formData.setXHR = function(xhr) {
                            xhr.upload.onprogress = function(e) {
                                value.percent = 100.0 * e.loaded / e.total;
                                $rootScope.$apply();
                            };
                        };
                        return formData;
                    }
                };

                var promise = $http(httpConfig).then(function(response) {
                    var data = response.data;
                    var promise = value.$promise;

                    if (data) {
                        angular.copy(data, value);
                        value.$promise = promise;
                    }

                    value.$resolved = true;
                    response.resource = value;
                    return response;
                }, function(response) {
                    value.$resolved = true;
                    (error || angular.noop)(response);
                    return $q.reject(response);
                });

                promise = promise.then(function(response) {
                    (success || angular.noop)(response.resource, response.headers);
                    return response.resource;
                });

                value.$promise = promise;
                value.$resolved = false;

                return value;
            };


            return UploadAttach;
        }]
    };
});