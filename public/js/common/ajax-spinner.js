/**
 * ajax 指示器
 */
angular.module('common').config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$rootScope', '$q', '$timeout', function($rootScope, $q, $timeout) {
        var lastTimeout;
        var requestQueue =[];
        var SHOW_AFTER = 200;

        return {
            'request': function(config) {
                config.reqTimeout = $timeout(function() {
                    $rootScope.ajaxing = true;
                    $rootScope.ajaxingMethod = config.method;
                }, SHOW_AFTER);
                config.requestStartAt = new Date().getTime();
                requestQueue.push(config);

                return config || $q.when(config);
            },
            'response': function(response) {
                var config = response.config;
                requestQueue = _.without(requestQueue, config);
                $timeout.cancel(config.reqTimeout);
                $timeout(function() {
                    if(requestQueue.length === 0){
                        $rootScope.ajaxing = false;
                    }
                }, config.requestStartAt + SHOW_AFTER + 700 - new Date().getTime());

                return response || $q.when(response);
            }
        };
    }]);
}]);

angular.module('common').directive('ajaxSpinner', function() {
    return {
        restrict: 'EA',
        template: '<div class="ajax-spinner" ng-class="{show: ajaxing}">' +
            '<i class="icon-spinner icon-spin"></i> {{ajaxingMethod == "GET" ? "载入中" : "处理中"}}...</div>'
    };
});