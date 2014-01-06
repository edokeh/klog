/**
 * 设置 popover 元素的位置，属性指定 popover 所针对的元素，需要隐藏时置为空
 * <div popover-for="trigger"></div>
 */
define(function(require, exports, module) {
    var angular = require('angularjs');

    module.exports = {
        'popoverFor': ['$document', '$parse', function($document, $parse) {
            return {
                link: function(scope, element, attrs) {
                    var trigger;

                    scope.$watch(function(scope) {
                        return scope.$eval(attrs.popoverFor);
                    }, function(value) {
                        if (angular.isElement(value)) {
                            trigger = value;
                            element.show();
                            var pos = value.position();
                            var width = element.width();
                            var height = element.height();
                            element.css({
                                left: pos.left - width / 2 + trigger.outerWidth() / 2,
                                top: pos.top - height - 5
                            }).addClass('in');
                        }
                        else {
                            element.hide().removeClass('in');
                            trigger = null;
                        }
                    });

                    // 点击其他地方时隐藏
                    $document.find('body').on('click', function(e) {
                        if (e.target === trigger[0]
                            || (trigger && trigger[0].contains(e.target))
                            || element[0].contains(e.target)) {
                            return;
                        }
                        $parse(attrs.popoverFor).assign(scope, null);
                        scope.$apply();
                    });

                    // 销毁时解除绑定
                    element.on('$destroy', function() {
                        $document.find('body').off('click');
                    });
                }
            };
        }]
    };
});