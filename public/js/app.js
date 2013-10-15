var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'restangular', 'common', 'nav']);

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


SeajsRoute.setApp(admin);

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', function ($routeProvider, RestangularProvider, $httpProvider) {

    $routeProvider
        .when('/categories', SeajsRoute.createRoute({
            controller: 'category.index',
            module: '/js/category/index'
        }))
        .when('/pages', SeajsRoute.createRoute({
            controller: 'page.index',
            module: '/js/page/index'
        }))
        .when('/blogs', SeajsRoute.createRoute({
            controller: 'blog.index',
            module: '/js/blog/index'
        }))
        .otherwise({redirectTo: '/blogs'});


    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    $httpProvider.interceptors.push('ajaxSpinner');
}]);