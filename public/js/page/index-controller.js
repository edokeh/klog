define(function (require, exports, module) {

    var IndexController = ['$scope', '$routeParams', 'Model', '$templateCache', function ($scope, $routeParams, Model, $templateCache) {
        var Page = Model.create('admin/pages');

        $scope.pages = [];

        Page.getList().then(function (pages) {
            $scope.pages = pages;
        });

        $scope.remove = function (page) {
            $scope.pages.remove(page);
        };
    }];

    IndexController.template = 'page/index';

    module.exports = IndexController;
});
