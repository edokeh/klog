define(function(require, exports, module) {
    var angular = require('angularjs');
    var tooltip = require('./tooltip');

    angular.module('ui.bootstrap.popover', [tooltip.name])
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

    var m = angular.module('ui.bootstrap.popover');

    m.run(['$templateCache', function($templateCache) {
        $templateCache.put('template/popover/popover.html', require('./template/popover/popover.html'));
    }]);

    module.exports = m;
});
