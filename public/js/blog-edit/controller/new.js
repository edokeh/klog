/**
 * 文章列表
 */
define(function(require, exports, module) {

    var NewController = ['$scope', 'Blog', 'BlogForm', function($scope, Blog, BlogForm) {

        $scope.blog = new Blog({
            title: '',
            content: ''
        });

        BlogForm.initScope($scope);
    }];

    NewController.templateUrl = 'blog/form';
    NewController.title = '写文章';

    module.exports = {'blogEdit.new': NewController};
});