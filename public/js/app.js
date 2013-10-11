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

admin.controller('xx', function ($scope) {
    $scope.data = 'sb';
});
var html = '';

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', function ($routeProvider, RestangularProvider, $httpProvider) {
    $routeProvider
        .when('/blogs', {templateUrl: '/js/blog/index.html', controller: 'BlogCtrl'})
        .when('/categories', {templateUrl: '/js/category/index.html', controller: 'CategoryCtrl', title: '分类'})
        .when('/pages', {templateUrl: '/js/page/index.html', controller: 'PageCtrl'})
        .when('/xx', {
            template: function () {
                return html;
            },
            title: 'hhee',
            controller: 'xx',
            resolve: {
                data: function ($q) {
                    var defer = $q.defer();

                    setTimeout(function () {
                        html = '<div>{{data}}</div>';
                        defer.resolve('xx');
                    }, 1000);

                    return defer.promise;
                }
            }
        })
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    $httpProvider.interceptors.push('ajaxSpinner');
}]);


seajs.use('/js/blog/index', function (module) {
    admin.run(function ($controllerProvider) {
        $controllerProvider.register(module.controllers);
    });

//    _.each(module.factories, function (factory, name) {
//        admin.factory(name, factory);
//    });
});