/**
 * 页面编辑表单
 */
define(function (require) {
    var $ = require('$');
    var MarkdownEditor = require('../common/markdown-editor');
    require('jquery-ujs');

    new MarkdownEditor();
});