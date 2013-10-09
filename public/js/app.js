var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'restangular', 'common', 'nav', 'blog', 'category', 'statistics']);

admin.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/blogs?status=:status', {templateUrl: '/js/blog/index.html', controller: 'BlogCtrl'})
        .when('/blogs', {redirectTo: '/blogs?status=1'})
        .when('/categories', {templateUrl: '/js/category/index.html', controller: 'CategoryCtrl'})
        .when('/statistics', {templateUrl: '/js/statistics/index.html', controller: 'StatisticsCtrl'})
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);
}]);
