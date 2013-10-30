define(function(require, exports, module) {
    var IndexController = require('./index-controller');
    var indeTpl = require('./index.html');

    module.exports = {
        controllers: {
            'blog.index': IndexController
        },
        templates: {
            'blog/index': indeTpl
        }
    };
});