/**
 * 为元素提供类似 input[type=file] 的功能
 * 示例 <a file-input ng-select="do(files)" accept=".jpg, .png"></a>
 */
define(function(require, exports, module) {
    module.exports = {
        'fileInput': [function() {
            return {
                restrict: 'CA',
                scope: {
                    ngSelect: '&',
                    accept: '@'
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        var fileInput = createInput();
                        element.after(fileInput.hide());
                        fileInput.click();
                    });

                    // 创建 input file
                    function createInput() {
                        if (createInput.fileInput) {
                            createInput.fileInput.remove();
                        }
                        createInput.fileInput = angular.element('<input type="file" multiple accept="' + scope.accept + '" />');
                        createInput.fileInput.bind('change', function(e) {
                            var fileList = e.target.files;
                            scope.$apply(function() {
                                scope.ngSelect({files: fileList});
                            });
                        });
                        return createInput.fileInput;
                    }
                }
            };
        }]
    };
});