/**
 * Blog
 */
define(function(require, exports, module) {
    var angular = require('angularjs');

    module.exports = {
        'Attach': ['$rootScope', '$q', '$resource', '$http', function($rootScope, $q, $resource, $http) {
            var Attach = $resource('/admin/attaches/:id.json', {id: '@id'}, {});


            return Attach;
        }]
    };
});