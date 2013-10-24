define(function (require, exports, module) {
    var IndexController = require('./index-controller');

    module.exports = {
        controllers: {
            'comments.index': IndexController
        }
    };
});