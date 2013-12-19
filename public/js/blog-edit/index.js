/**
 * BLOG 模块
 */
define(function(require, exports, module) {
    var angular = require('angularjs');
    var editor = require('../editor/index');

    var blogEdit = angular.module('blog', [editor.name]);

    blogEdit.controller(require('./controller/form'));

    blogEdit.template({
        'blogEdit/form': require('./template/form.html')
    });

    module.exports = blogEdit;
});