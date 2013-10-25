define(function(require, exports, module) {
    var IndexController = require('./index-controller');

    var indexTpl = require('./index.html');

    module.exports = {
        controllers: {
            'page.index': IndexController
        },
        templates: {
            'page/index': indexTpl
        },
        factories: {
            'Page': function(Model) {
                return Model.create('admin/pages');
            }
        }
    };
});