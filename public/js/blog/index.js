define(function(require, exports, module) {
    var IndexController = require('./index-controller');

    module.exports = {
        controllers: {
            'blog.index': IndexController
        },
        templates: {
            'blog/index': require('./index.html'),
            'blog/confirm': require('./confirm.html')
        },
        factories: {
            'Confirm': require('./confirm')
        }
    };
});