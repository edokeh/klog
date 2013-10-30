/**
 * ajax 指示器
 */
angular.module('common').config(['$httpProvider', function($httpProvider) {

    $httpProvider.interceptors.push(['$rootScope', '$q', function($rootScope, $q) {
        return {
            'request': function(config) {
                $rootScope.ajaxing = true;
                $rootScope.ajaxingMethod = config.method;
                return config || $q.when(config);
            },
            'response': function(response) {
                $rootScope.ajaxing = false;
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