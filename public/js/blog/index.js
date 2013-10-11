//var blog = angular.module('blog', []);

//{
//    controller:
//}
//
//admin.factory('Blog', function (Model) {
//    return Model.create('admin/blogs');
//});

define(function (require, exports) {
    var controllers = require('./controller');

    return {
        controllers: controllers,
        factories: {
            'Blog': function (Model) {
                return Model.create('admin/blogs');
            }
        }
    };
});