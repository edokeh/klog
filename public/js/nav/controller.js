nav.controller({
    NavCtrl: ['$scope', '$location', function ($scope, $location) {
        $scope.navItems = [
            {
                name: '文章',
                url: '/blogs'
            },
            {
                name: '评论',
                url: '/comments'
            },
            {
                name: '分类',
                url: '/categories'
            },
            {
                name: '页面',
                url: '/pages'
            },
            {
                name: '附件',
                url: '/attaches'
            },
            {
                name: '设置',
                url: '/settings/website/edit'

            }
        ];

        $scope.$on('$routeChangeSuccess', function () {
            var url = $location.path();
            _.each($scope.navItems, function (item) {
                if (item.url === url) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });

        });
    }]
});