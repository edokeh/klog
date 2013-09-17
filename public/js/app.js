var admin = angular.module('admin', ['restangular', 'blog']);

admin.config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
    $routeProvider
        .when('/blogs', {templateUrl: '/js/blog/blog.html', controller: 'BlogCtrl'})
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);
}]);
