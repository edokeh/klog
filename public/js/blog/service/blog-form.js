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

    var BlogForm = ['Blog', 'BlogCategory', 'BlogAttach', '$location', 'Flash', '$modal', function(Blog, BlogCategory, BlogAttach, $location, Flash, $modal) {

        return {
            // $scope.blog 需要被设置
            initScope: function($scope) {
                $scope.UPLOAD_FILE_TYPES = '.jpg, .jpeg, .gif, .png, .pdf, .ppt, .pptx, .rar, .zip, .txt';

                $scope.categories = BlogCategory.query();

                // 预览
                $scope.$watch('blog.content', function(value) {
                    marked(value, function(err, data) {
                        $scope.htmlContent = data;
                    });
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

                $scope.showUpload = function() {
                    $modal.open({
                        templateUrl: 'blog/upload',
                        controller: require('../controller/upload')
                    });
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

                // 拖动文件到主页面时显示 Drop 框
                $scope.toggleFileDrop = function($event) {
                    $scope.isFileDropShow = $event.type === 'dragenter' && hasFile($event);
                };

                // 拖动文件到 Drop 框时高亮
                $scope.toggleFileDropClass = function($event) {
                    $scope.fileDropDragOver = $event.type === 'dragenter';
                };

                // 拖动中改变鼠标以提示
                $scope.setCursor = function($event, type) {
                    if (hasFile($event)) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $event.originalEvent.dataTransfer.dropEffect = type;
                    }
                };

                var types = _.map($scope.UPLOAD_FILE_TYPES.split(','), function(i) {
                    return i.trim().substr(1);
                });
                // 校验类型的正则 /[^\s]+(\.(jpg|zip|pdf))$/i
                var typeMask = new RegExp('[^\\s]+(\\.(' + types.join('|') + '))$', 'i');

                $scope.attaches = [];

                // 拖动上传
                $scope.dropUpload = function($event) {
                    $event.preventDefault();
                    var files = _.filter($event.originalEvent.dataTransfer.files, function(file) {
                        return typeMask.test(file.name);
                    });
                    doUpload(files);
                };

                $scope.selectUpload = function($event) {
                    var files = $event.originalEvent.target.files;
                    doUpload(files);
                };

                $scope.removeAttach = function(attach) {
                    attach.$remove(function() {
                        $scope.attaches = _.without($scope.attaches, attach);
                        if ($scope.attaches === 0) {
                            $scope.attachShow = false;
                        }
                    });
                };

                // 上传
                $scope.doUpload = function(files) {
                    _.each(files, function(file) {
                        var attach = BlogAttach.create({file: file});
                        $scope.attaches.push(attach);
                    });
                    if (files.length > 0) {
                        $scope.attachShow = true;
                    }
                };

                // 拖拽事件中是否有文件
                function hasFile(event) {
                    return _.contains(event.originalEvent.dataTransfer.types, 'Files');
                }
            }
        };
    }];

    module.exports = BlogForm;
});