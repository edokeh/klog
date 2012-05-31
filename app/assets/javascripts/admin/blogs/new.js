//= require admin/preview
//= require admin/attach
$(function() {
    $("button[data-status]").click(function(e) {
        $("#blog_status").val($(this).data('status'));
    });

    Preview.init($("#blog_content"));

    AttachUploader.init();

    AttachUploader.onInsert(function(code) {
        var value = $("#blog_content").val();
        var insertPos = $("#blog_content").data('inserPos') || $("#blog_content").val().length;
        value = value.substr(0, insertPos) + '\r\n' + code + '\r\n' + value.substr(insertPos);
        $("#blog_content").val(value);
    });

    $("#blog_content").blur(function() {
        if (this.selectionEnd) {
            $(this).data('insertPos', this.selectionEnd);
        }
    });


});