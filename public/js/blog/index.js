define(function (require, exports, module) {
    var IndexController = require('./index-controller');

    module.exports = {
        controllers: {
            'blog.index': IndexController
        },
        factories: {
            'Blog': function (Model) {
                return Model.create('admin/blogs');
            }
        }
    };
});