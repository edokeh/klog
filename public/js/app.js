var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'ngSanitize', 'restangular', 'common', 'nav', 'ui.bootstrap.dropdownToggle', 'ui.bootstrap.modal']);

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', 'SeajsLazyModuleProvider', 'RESTProvider', function($routeProvider, RestangularProvider, $httpProvider, SeajsLazyModuleProvider, RESTProvider) {

    SeajsLazyModuleProvider.setTilteSuffix(' - Klog 后台管理');
    var category = SeajsLazyModuleProvider.create('/js/category/index');
    var blog = SeajsLazyModuleProvider.create('/js/blog/index');
    var page = SeajsLazyModuleProvider.create('/js/page/index');
    var comment = SeajsLazyModuleProvider.create('/js/comment/index');

    $routeProvider
        .when('/categories', category.routeFor('category.index'))
        .when('/blogs', blog.routeFor('blog.index'))
        .when('/pages', page.routeFor('page.index'))
        .when('/comments', comment.routeFor('comments.index'))
        .otherwise({redirectTo: '/blogs'});

    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(['post', 'delete']);

    // 后端接口的 URL
    RESTProvider.setURL({
        BLOG: 'admin/blogs',
        CATEGORY: 'admin/categories',
        PAGE: 'admin/pages'
    });

}]);

admin.run(['SeajsLazyModule', '$templateCache', function(SeajsLazyModule, $templateCache) {
    SeajsLazyModule.init($templateCache);
}]);