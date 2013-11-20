/**
 * 用于在 route 之间传递消息的组件，类似 Rails 的 flash
 */
angular.module('common').factory('Flash', function() {
    var Flash = {};
    var flashMsg = {};

    // getter/setter
    _.each(['success', 'error', 'tmp'], function(key) {
        Flash[key] = function(value) {
            if (value) {
                flashMsg[key] = value;
            }
            else {
                var tmp = flashMsg[key];
                delete flashMsg[key];
                return tmp;
            }
        };
    });

    return Flash;
});