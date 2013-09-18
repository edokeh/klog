var admin = angular.module('admin', ['restangular', 'common', 'blog', 'category']);

admin.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/blogs', {redirectTo: '/blogs?status=1'})
        .when('/blogs?status=:status', {templateUrl: '/js/blog/index.html', controller: 'BlogCtrl'})
        .when('/categories', {templateUrl: '/js/category/index.html', controller: 'CategoryCtrl'})
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);
}]);
