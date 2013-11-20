/**
 * 文章表单
 */
define(function(require, exports, module) {
    var marked = require('marked');
    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        langPrefix: 'lang-'
    });

    var BlogForm = ['Blog', 'BlogCategory', '$location', 'Flash', function(Blog, BlogCategory, $location, Flash) {

        return {
            // $scope.blog 需要被设置
            initScope: function($scope) {

                $scope.categories = BlogCategory.query();

                // 预览
                $scope.$watch('blog.content', function(value) {
                    marked(value, function(err, data) {
                        $scope.htmlContent = data;
                    });
                });

                // tags
                $scope.$watch('tags', function(value) {
                    if (value) {
                        $scope.blog.tag_list = _.uniq(value.toLowerCase().split(' '));
                    }
                });

                // 滚动条同步
                $scope.scrollSync = function(scrollTopPercent) {
                    if ($scope.changed) {
                        $scope.changed = false;
                        return;
                    }
                    // 避免死循环
                    $scope.scrollTopPercent = scrollTopPercent;
                    $scope.changed = true;
                };

                $scope.save = function(isPublish) {
                    if ($scope.form.$valid) {
                        $scope.blog.setPublish(isPublish);
                        $scope.blog.$save(function() {
                            Flash.tmp($scope.blog.id);
                            $location.url('/blogs');
                        });
                    }
                };
            }
        };
    }];

    module.exports = BlogForm;
});