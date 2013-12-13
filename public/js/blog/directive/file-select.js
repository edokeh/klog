/**
 * 用于 input file 获取选择的文件对象
 */
define(function(require, exports, module) {
    module.exports = [function() {
        return {
            restrict: 'CA',
            scope: {
                fileSelect: '&'
            },
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    // 创建 input file
                    var fileInput = $('<input type="file" multiple />');
                    element.after(fileInput.hide());
                    fileInput.bind('change', function(e) {
                        var fileList = e.target.files;
                        var files = [];
                        if (fileList !== null) {
                            for (var i = 0; i < fileList.length; i++) {
                                files.push(fileList.item(i));
                            }
                        }

                        scope.$apply(function() {
                            scope.fileSelect({files: fileList});
                        });
                    });
                    fileInput.click();
                });
            }
        };
    }];
});