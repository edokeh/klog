angular.module('common').directive('errorTip', ['$compile', '$timeout', function ($compile, $timeout) {
    var template = '<div class="tooltip bottom fade" ng-class="{in: showError, out: !showError}">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="tooltip-inner">{{tip}}</div>' +
        '</div>';

    return {
        restrict: 'A',
        scope: {
            errorTip: '='
        },
        compile: function (element, attrs) {
            var attrNames = 'model click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur'.split(' ');
            angular.forEach(attrNames, function (name) {
                name = 'ng' + name.substr(0, 1).toUpperCase() + name.substr(1);
                if (attrs[name]) {
                    attrs.$set(name, '$parent.' + attrs[name], false);
                }
            });

            return function (scope, element, attrs) {
                var tooltip = $compile(template)(scope);
                element.after(tooltip);

                var promise;
                scope.$watch('errorTip', function (value) {
                    if (value && value.length > 0) {
                        scope.showError = true;
                        scope.tip = value;
                        $timeout.cancel(promise);
                    } else {
                        scope.showError = false;
                        promise = $timeout(function () {
                            scope.tip = value;
                        }, 3000);
                    }
                });
            };
        }
    };
}]);