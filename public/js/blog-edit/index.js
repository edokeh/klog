/**
 * BLOG 模块
 */
define(function(require, exports, module) {
    var angular = require('angularjs');
    var editor = require('../editor/index');

    var blogEdit = angular.module('blog', [editor.name]);

    blogEdit.seajsController(require('./controller/form'));

    blogEdit.directive(require('./directive/popover-for'));

    module.exports = blogEdit;
});