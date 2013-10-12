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
    var tpl = require('./index.html');

    return {
        controllers: controllers,
        templates: {
            'index.html': tpl
        },
        factories: {
            'Blog': function (Model) {
                return Model.create('admin/blogs');
            }
        }
    };
});