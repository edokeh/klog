/**
 * popover 需要使用者提供触发器与 Popover 元素
 *
 * <a popover-trigger="myTrigger"></a>
 * <div popover-window="myTrigger"></div>
 */
define(function(require, exports, module) {
    module.exports = {
        /**
         * 触发器，也可通过 popover-show 双向绑定属性来手工触发
         */
        'popoverTrigger': ['$parse', function($parse) {
            return {
                restrict: 'CA',
                link: function(scope, element, attrs) {

                    var triggerGetter = $parse(attrs.popoverTrigger);
                    var showGetter = $parse(attrs.popoverShow);

                    scope.$watch(function(scope) {
                        return scope.$eval(attrs.popoverTrigger);
                    }, function(value) {
                        showGetter.assign(scope, !!value);
                        //scope.$apply();
                    });

                    scope.$watch(function(scope) {
                        return scope.$eval(attrs.popoverShow);
                    }, function(value) {
                        triggerGetter.assign(scope, !!value ? element : null);
                        //scope.$apply();
                    });

                    element.on('click', function() {
                        if (showGetter(scope)) {
                            showGetter.assign(scope, false);
                        }
                        else {
                            showGetter.assign(scope, true);
                        }
                        scope.$apply();
                    });
                }
            };
        }],

        /**
         * 实际的 Popover 元素
         */
        'popoverWindow': ['$document', '$parse', function($document, $parse) {
            return {
                restrict: 'CA',
                link: function(scope, element, attrs) {
                    var trigger;

                    scope.$watch(function(scope) {
                        return scope.$eval(attrs.popoverWindow);
                    }, function(value) {
                        // 一旦有了 trigger，立刻计算位置并显示
                        if (angular.isElement(value)) {
                            trigger = value;
                            var placement = element.hasClass('top') ? 'top' : element.hasClass('bottom') ? 'bottom' : 'top';
                            element.show();
                            var pos = value.position();
                            var width = element.width();
                            var height = element.height();
                            element.css({
                                left: pos.left - width / 2 + trigger.outerWidth() / 2,
                                top: placement === 'top' ? (pos.top - height - 5) : (pos.top + trigger.outerHeight() + 5)
                            }).addClass('in');
                        }
                        else {
                            element.hide().removeClass('in');
                            trigger = null;
                        }
                    });

                    // 点击其他地方时隐藏
                    $document.find('body').on('click', function(e) {
                        if (!trigger || (containsOrIs(trigger[0], e.target) || containsOrIs(element[0], e.target))) {
                            return;
                        }
                        $parse(attrs.popoverWindow).assign(scope, null);
                        scope.$apply();
                    });

                    // 销毁时解除绑定
                    element.on('$destroy', function() {
                        $document.find('body').off('click');
                    });

                    function containsOrIs(parent, child) {
                        return parent === child || parent.contains(child);
                    }
                }
            };
        }]
    };
});