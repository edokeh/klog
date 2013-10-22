var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'restangular', 'common', 'nav']);

admin.factory('ajaxSpinner', ['$rootScope', '$q', function($rootScope, $q) {
    return {
        'request': function(config) {
            $rootScope.ajaxing = true;
            return config || $q.when(config);
        },
        'response': function(response) {
            $rootScope.ajaxing = false;
            return response || $q.when(response);
        }
    };
}]);

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', 'SeajsModuleProvider', function($routeProvider, RestangularProvider, $httpProvider, SeajsModuleProvider) {

    SeajsModuleProvider.setTilteSuffix(' - Klog 后台管理');
    var category = SeajsModuleProvider.create('/js/category/index');
    var blog = SeajsModuleProvider.create('/js/blog/index');
    var page = SeajsModuleProvider.create('/js/page/index');

    $routeProvider
        .when('/categories', category.routeFor('category.index'))
        .when('/blogs', blog.routeFor('blog.index'))
        .when('/pages', page.routeFor('page.index'))
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    $httpProvider.interceptors.push('ajaxSpinner');
}]);

admin.run(['SeajsModule', function(SeajsModule) {
    SeajsModule.init();
}]);