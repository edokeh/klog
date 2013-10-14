define(function (require, exports, module) {
    var IndexController = require('./index-controller');

    module.exports = {
        controllers: {
            'page.index': IndexController
        },
        factories: {
            'Page': function (Model) {
                return Model.create('admin/pages');
            }
        }
    };
});