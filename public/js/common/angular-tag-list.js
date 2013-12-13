/**
 * angular 的 ngList 不能满足需求，主要是 value 的显示无法自定义，另外增加了去重处理
 * <input ng-model="tags" tag-list />
 */
angular.module('common').directive('tagList', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            var separator = /\s+/;
            var joinChar = ' ';

            var parse = function(viewValue) {
                // If the viewValue is invalid (say required but empty) it will be `undefined`
                if (angular.isUndefined(viewValue)) {
                    return;
                }
                return _.uniq(viewValue.split(separator));
            };

            ctrl.$parsers.push(parse);
            ctrl.$formatters.push(function(value) {
                if (angular.isArray(value)) {
                    return value.join(joinChar);
                }

                return undefined;
            });

            // Override the standard $isEmpty because an empty array means the input is empty.
            ctrl.$isEmpty = function(value) {
                return !value || !value.length;
            };
        }
    };
});