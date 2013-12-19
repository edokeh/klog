/**
 * 编辑或新建 blog
 */
define(function(require, exports, module) {

    var Controller = ['$scope', 'Blog', 'Category', '$routeParams', '$location', 'Flash', 'Editor', function($scope, Blog, Category, $routeParams, $location, Flash, Editor) {
        // 编辑 or 新建
        if ($routeParams.id) {
            $scope.blog = Blog.get({id: $routeParams.id});
        }
        else {
            $scope.blog = new Blog({content: ''});
        }

        $scope.UPLOAD_FILE_TYPES = '.jpg, .jpeg, .gif, .png, .pdf, .ppt, .pptx, .rar, .zip, .txt';

        $scope.categories = Category.query();

        $scope.save = function(isPublish) {
            if ($scope.form.$valid) {
                $scope.blog.setPublish(isPublish);
                $scope.blog.$save(function() {
                    Flash.tmp($scope.blog.id);
                    $location.url('/blogs');
                });
            }
        };

        $scope.insertCode = function(attach) {
            $scope.blog.content += $scope.codeFor(attach);
        };

        Editor.addPreviewFn($scope, {
            src: 'blog.content',
            dest: 'htmlContent'
        });

        Editor.addAttachFn($scope);

    }];

    Controller.templateUrl = 'blogEdit/form';
    Controller.title = '写文章';

    module.exports = {'blogEdit.form': Controller};
});