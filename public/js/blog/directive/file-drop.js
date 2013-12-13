/**
 * 用于将文件 drop 到区域，提供对 dragover/dragleave 的 class 变换支持
 */
define(function(require, exports, module) {
    module.exports = ['$timeout', function($timeout) {
        var DEFAULT_CLASS = 'dragover';

        return {
            restrict: 'CA',
            scope: {
                fileDrop: '&',
                dragOverClass: '@',
                fileDropAccept: '@'  // 接受拖动上传的文件类型
            },
            link: function(scope, element, attrs) {
                var timeout;
                if (attrs.fileDropAccept) {
                    var types = _.map(attrs.fileDropAccept.split(','), function(i) {
                        return i.trim().substr(1);
                    });
                    // 校验类型的正则 /[^\s]+(\.(jpg|zip|pdf))$/i
                    var typeMask = new RegExp('[^\\s]+(\\.(' + types.join('|') + '))$', 'i');
                }

                element.bind('dragover', function(e) {
                    e.preventDefault();
                    $timeout.cancel(timeout);
                    element.addClass(attrs.dragOverClass || DEFAULT_CLASS);
                });
                element.bind('dragleave', function(e) {
                    console.log(element[0]);
                    timeout = $timeout(function() {
                        element.removeClass(attrs.dragOverClass || DEFAULT_CLASS);
                    });
                });
                element.bind('drop', function(e) {
                    e.preventDefault();
                    element.removeClass(attrs.dragOverClass || DEFAULT_CLASS);
                    if (scope.fileDrop) {
                        var files = _.filter(e.originalEvent.dataTransfer.files, function(file) {
                            return !attrs.fileDropAccept || typeMask.test(file.name);
                        });
                        scope.fileDrop({
                            files: files,
                            $event: e
                        });
                        e.stopPropagation();
                    }
                });
            }
        };
    }];
});