/**
 * 滚动（scroll）的事件与设置值
 */
angular.module('common').directive('ngScroll', ['$rootScope', function($rootScope) {
        return {
            restrict: 'A',
            scope: {
                ngScroll: '&'
            },
            link: function(scope, element, attrs) {
                element.bind('scroll', function(e) {
                    var currScrollTop = element.scrollTop();
                    scope.$apply(function() {
                        scope.ngScroll({
                            $event: e,
                            scrollTop: currScrollTop,
                            scrollTopPercent: currScrollTop / element[0].scrollHeight
                        });
                    });
                });
            }
        };
    }]).directive('ngScrollTopPercent', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.ngScrollTopPercent, function(value) {
                    element.scrollTop(value * element[0].scrollHeight);
                });
            }
        };
    });