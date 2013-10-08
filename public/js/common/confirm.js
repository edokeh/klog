angular.module('common').directive('confirm', ['$compile', '$timeout', '$document', function ($compile, $timeout, $document) {
    var template = '<div class="pop-confirm">' +
        '<div class="pop-confirm-inner clearfix">' +
        '<div class="pop-confirm-content">{{confirm}}' +
        '</div>' +
        '<div class="pull-right">' +
        '<a class="btn btn-small btn-primary submit" ng-click="hide();confirmOk()">确定</a>&nbsp;' +
        '<a class="btn btn-small cancel" ng-click="hide()">取消</a>' +
        '</div>' +
        '</div>' +
        '</div>';

    var $pop = null;

    return {
        restrict: 'A',
        scope: {
            confirm: '@',
            confirmOk: '&'
        },
        compile: function (element, attrs) {

            return function (scope, element, attrs) {
                var triggerPos = element.position();
                var triggerWidth = window.getComputedStyle ? window.getComputedStyle(element[0]).width : element[0].currentStyle.width;

                element.bind('click', function () {
                    if ($pop) {
                        $pop.remove();
                    }

                    $pop = $compile(template)(scope);
                    $document.find('body').append($pop);

                    var height = parseInt(window.getComputedStyle ? window.getComputedStyle($pop[0]).height : $pop[0].currentStyle.height, 10);

                    $pop.css({
                        left: triggerPos.left - parseInt(triggerWidth, 10) * 0.4 + 'px',
                        top: triggerPos.top + 'px',
                        visibility: 'visible',
                        height: 0
                    });

                    $timeout(function () {
                        $pop.css({
                            top: triggerPos.top - height + 'px',
                            height: height + 'px',
                            '-webkit-transition': '250ms ease-out all',
                            '-moz-transition': '250ms ease-out all',
                            '-o-transition': '250ms ease-out all',
                            'transition': '250ms ease-out all'
                        });
                    });
                });

                scope.hide = function () {
                    $pop.css({
                        top: triggerPos.top + 'px',
                        height: 0
                    });
                    $timeout(function () {
                        $pop.remove();
                    }, 250);
                };
            };
        }
    };
}]);