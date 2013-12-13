define(function(require, exports, module) {
    angular.module('ui.bootstrap.popover', ['ui.bootstrap.tooltip'])
        .directive('popoverPopup', function() {
            return {
                restrict: 'EA',
                replace: true,
                scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
                templateUrl: 'template/popover/popover.html'
            };
        })
        .directive('popover', [ '$compile', '$timeout', '$parse', '$window', '$tooltip', function($compile, $timeout, $parse, $window, $tooltip) {
            return $tooltip('popover', 'popover', 'click');
        }]);
});
