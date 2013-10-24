nav.controller({
    NavCtrl: ['$scope', '$location', function($scope, $location) {
        $scope.navItems = [
            {
                name: '写文章',
                ico: 'icon-pencil',
                url: '/comments'
            },
            {
                name: '文章',
                ico: 'icon-file-text',
                url: '/blogs'
            },
            {
                name: '评论',
                ico: 'icon-comments',
                url: '/comments'
            },
            {
                name: '页面',
                ico: 'icon-link',
                url: '/pages'
            },
            {
                name: '设置',
                ico: 'icon-cog',
                url: '/settings/website/edit'

            }
        ];

        $scope.$on('$routeChangeStart', function() {
            var url = $location.path();
            _.each($scope.navItems, function(item) {
                if (item.url === url) {
                    item.active = true;
                }
                else {
                    item.active = false;
                }
            });

        });
    }]
});