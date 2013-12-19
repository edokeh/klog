/**
 * 元素 scrollTop 的值
 */
define(function(require, exports, module) {
    module.exports = {
        scrollPos: function() {
            return {
                restrict: 'A',
                scope: {
                    scrollPos: '='
                },
                link: function(scope, element, attrs, ngModel) {
                    var ignoreEvent;

                    scope.$watch('scrollPos', function(value) {
                        if(!value){
                            return;
                        }
                        //value = parseInt(value, 10);
                        element.scrollTop(value * element[0].scrollHeight / 1);
                        ignoreEvent = true;
                    });

                    // Listen for change events to enable binding
                    element.on('scroll', function() {
                        if (ignoreEvent) {
                            ignoreEvent = false;
                            return;
                        }
                        scope.$apply(function() {
                            var currScrollTop = element.scrollTop();
                            var scrollTopPercent = 1 * currScrollTop / element[0].scrollHeight;
                            scope.scrollPos = (scrollTopPercent);
                        });
                    });
                }
            };
        }
    };
});