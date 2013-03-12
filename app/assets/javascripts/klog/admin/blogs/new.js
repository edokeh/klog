/**
 * 新建文章
 */
define(function (require) {
    var $ = require('$');

    $("button[data-status]").click(function (e) {
        $("#blog_status").val($(this).data('status'));
    });
});