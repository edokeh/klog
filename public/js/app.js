var admin = angular.module('admin', ['ngAnimate', 'ngRoute', 'ngSanitize', 'restangular', 'common', 'nav', 'ui.bootstrap.dropdownToggle']);

admin.config(['$routeProvider', 'RestangularProvider', '$httpProvider', 'SeajsModuleProvider', 'RESTProvider', function($routeProvider, RestangularProvider, $httpProvider, SeajsModuleProvider, RESTProvider) {

    SeajsModuleProvider.setTilteSuffix(' - Klog 后台管理');
    var category = SeajsModuleProvider.create('/js/category/index');
    var blog = SeajsModuleProvider.create('/js/blog/index');
    var page = SeajsModuleProvider.create('/js/page/index');
    var comment = SeajsModuleProvider.create('/js/comment/index');

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

admin.run(['SeajsModule', '$templateCache', function(SeajsModule, $templateCache) {
    SeajsModule.init($templateCache);
}]);


