/**
 * 新建文章
 */
define("klog/admin/blogs/new-debug", [ "$-debug" ], function(require) {
    var $ = require("$-debug");
    $("button[data-status]").click(function(e) {
        $("#blog_status").val($(this).data("status"));
    });
});