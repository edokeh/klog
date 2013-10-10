var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'restangular', 'common', 'nav', 'blog', 'category', 'page']);

admin.factory('ajaxSpinner', ['$rootScope', '$q', function ($rootScope, $q) {
    return {
        'request': function (config) {
            $rootScope.ajaxing = true;
            return config || $q.when(config);
        },
        'response': function (response) {
            $rootScope.ajaxing = false;
            return response || $q.when(response);
        }
    };
}]);

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', function ($routeProvider, RestangularProvider, $httpProvider) {
    $routeProvider
        .when('/blogs', {templateUrl: '/js/blog/index.html', controller: 'BlogCtrl'})
        .when('/categories', {templateUrl: '/js/category/index.html', controller: 'CategoryCtrl'})
        .when('/pages', {templateUrl: '/js/page/index.html', controller: 'PageCtrl'})
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    $httpProvider.interceptors.push('ajaxSpinner');
}]);
