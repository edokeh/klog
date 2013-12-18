/**
 * 将 PUT/DELETE 转为 POST
 */
define(function(require, exports, module) {
    module.exports = ['$httpProvider', function($httpProvider) {

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
    }];
});