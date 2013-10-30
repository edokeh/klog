define(function (require, exports, module) {

    var IndexController = ['$scope', '$routeParams', 'REST', function ($scope, $routeParams, REST) {
        $scope.pages = [];

        REST.PAGE.getList().then(function (pages) {
            $scope.pages = pages;
        });

        $scope.remove = function (page) {
            $scope.pages.remove(page);
        };
    }];

    IndexController.template = 'page/index';

    module.exports = IndexController;
});
