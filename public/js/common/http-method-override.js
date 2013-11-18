/**
 * 将 PUT/DELETE 转为 POST
 */
angular.module('common').config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            'request': function(config) {
                var method = config.method;
                if (method === 'DELETE' || method === "PUT") {
                    config.method = 'POST';
                    config.headers['X-HTTP-Method-Override'] = method;
                }
                return config || $q.when(config);
            }
        };
    }]);
}]);