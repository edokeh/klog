define(function(require, exports, module) {
    var angular = require('angularjs');
    var ngAnimate = require('angular-animate');
    var ngResource = require('angular-resource');
    var ngRoute = require('angular-route');
    var ngSanitize = require('angular-sanitize');
    var SeajsLazyAngular = require('seajs-lazy-angular');
    var bootstrap = require('bootstrap/index');
    var nav = require('./nav/index');
    var common = require('./common/index');

    var admin = angular.module('admin', [
        ngAnimate.name,
        ngRoute.name,
        ngResource.name,
        ngSanitize.name,
        nav.name,
        bootstrap.name,
        common.name
    ]);

    admin.config(SeajsLazyAngular.cacheInternals);
    SeajsLazyAngular.patchAngular();
    SeajsLazyAngular.setResolveCallback(['$rootScope', 'controller', function($rootScope, controller) {
        $rootScope.title = controller.title + ' - Klog 后台管理';
    }]);

    admin.config(['$routeProvider', function($routeProvider) {

        var blog = SeajsLazyAngular.createLazyStub('/js/blog/index');
        var blogEdit = SeajsLazyAngular.createLazyStub('/js/blog-edit/index');

        $routeProvider
            .when('/blogs/new', blogEdit.createRoute('blogEdit.form'))
            .when('/blogs/:id/edit', blogEdit.createRoute('blogEdit.edit'))
            .when('/blogs', blog.createRoute('blog.index'))
            //            .when('/pages', page.routeFor('page.index'))
            //            .when('/categories', category.routeFor('category.index'))
            //            .when('/comments', comment.routeFor('comments.index'))
            .otherwise({redirectTo: '/blogs'});
    }]);

    angular.bootstrap(window.document, ['admin']);
});