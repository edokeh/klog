define(function(require, exports, module) {
    var bootstrap = require('bootstrap/index');

    var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'ngResource', 'ngSanitize', 'restangular', 'common', nav.name, bootstrap.name]);

    admin.config(['$routeProvider', 'SeajsLazyModuleProvider', function($routeProvider, SeajsLazyModuleProvider) {

        SeajsLazyModuleProvider.setTilteSuffix(' - Klog 后台管理');
        var category = SeajsLazyModuleProvider.create('/js/category/index');
        var blog = SeajsLazyModuleProvider.create('/js/blog/index');
        var page = SeajsLazyModuleProvider.create('/js/page/index');
        var comment = SeajsLazyModuleProvider.create('/js/comment/index');

        $routeProvider
            .when('/blogs/new', blog.routeFor('blog.new'))
            .when('/blogs/:id/edit', blog.routeFor('blog.edit'))
            .when('/blogs', blog.routeFor('blog.index'))
            .when('/pages', page.routeFor('page.index'))
            .when('/categories', category.routeFor('category.index'))
            .when('/comments', comment.routeFor('comments.index'))
            .when('/sb', {controller: 'xx', template: '<h1>{{name}}</h1>'})
            .otherwise({redirectTo: '/blogs'});

    }]);

    admin.run(['SeajsLazyModule', '$templateCache', function(SeajsLazyModule, $templateCache) {
        SeajsLazyModule.init($templateCache);
    }]);

    angular.bootstrap(window.document, ['admin']);
});



//var sb = angular.module('sb', []);
//
//angular.module('sb').controller('xx', function($scope){
//    $scope.name = "sb";
//});