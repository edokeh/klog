/**
 * Markdown 编辑器
 */
define(function(require, exports, module) {
    var marked = require('marked');
    var _ = require('_');

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

    // 拖拽事件中是否有文件
    function hasFile(event) {
        return _.contains(event.originalEvent.dataTransfer.types, 'Files');
    }

    var Editor = ['Attach', '$modal', function(Attach, $modal) {

        return {
            /**
             * 创建编辑、预览的逻辑
             * @param $scope
             * @param options  {src: 'blog.content', dest: 'htmlContent'}
             */
            addPreviewFn: function($scope, options) {

                // 监控变化生成预览
                $scope.$watch(options.src, function(value) {
                    marked(value, function(err, data) {
                        $scope[options.dest] = data;
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
            },

            /**
             * 提供附件上传的功能，对于模板本身有一些要求
             * @param $scope
             */
            addAttachFn: function($scope) {
                // 拖动文件到主页面时显示 Drop 框
                $scope.toggleFileDrop = function($event) {
                    $scope.isFileDropShow = $event.type === 'dragenter' && hasFile($event);
                };

                // 拖动文件到 Drop 框时高亮
                $scope.toggleFileDropClass = function($event) {
                    $scope.fileDropDragOver = $event.type === 'dragenter';
                    if($event.type === 'dragenter'){
                        console.log($event);
                    }
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
                    $scope.doUpload(files);
                };

                $scope.selectUpload = function($event) {
                    var files = $event.originalEvent.target.files;
                    $scope.doUpload(files);
                };

                $scope.removeAttach = function(attach) {
                    attach.$remove(function() {
                        $scope.attaches = _.without($scope.attaches, attach);
                        if ($scope.attaches === 0) {
                            $scope.attachShow = false;
                        }
                    });
                };

                $scope.insertTo = function(attach) {
                    var code;
                    var url = 'http://' + location.host + attach.url;
                    if (attach.is_image) {
                        code = '![](' + url + ')';
                    }
                    else {
                        code = '[' + attach.file_name + '](' + url + ')';
                    }
                    $scope.blog.content += code;
                };

                // 上传
                $scope.doUpload = function(files) {
                    _.each(files, function(file) {
                        var attach = Attach.create({file: file});
                        $scope.attaches.push(attach);
                    });
                    if (files.length > 0) {
                        $scope.attachShow = true;
                    }
                };

                $scope.showTip = function() {
                    $modal.open({
                        templateUrl: 'blog/tip',
                        controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                            $scope.modal = $modalInstance;
                        }]
                    });
                };
            }
        };
    }];

    module.exports = {Editor: Editor};
});