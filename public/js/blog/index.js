/**
 * BLOG 模块
 */
define(function(require, exports, module) {
    var angular = require('angularjs');

    var blog = angular.module('blog', []);

    blog.controller(require('./controller/index'));

    blog.template({
        'blog/index': require('./template/index.html')
    });

    module.exports = blog;
});