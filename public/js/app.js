var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'restangular', 'common', 'nav', 'category', 'page']);

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
        .when('/categories', {templateUrl: '/js/category/index.html', controller: 'CategoryCtrl', title: '分类'})
        .when('/pages', {templateUrl: '/js/page/index.html', controller: 'PageCtrl'})
        .when('/blogs', SeajsRoute.create({
            controller: 'BlogCtrl',
            template: 'index.html',
            module: '/js/blog/index'

        }))
        .otherwise({redirectTo: '/blogs'});


    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    $httpProvider.interceptors.push('ajaxSpinner');
}]);