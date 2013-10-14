define(function (require, exports, module) {

    var IndexController = ['$scope', '$routeParams', 'Model', function ($scope, $routeParams, Model) {
        var Page = Model.create('admin/pages');

        $scope.pages = [];

        Page.getList().then(function (pages) {
            $scope.pages = pages;
        });

        $scope.remove = function (page) {
            $scope.pages.remove(page);
        };
    }];

    IndexController.template = require('./index.html');

    module.exports = IndexController;
});
