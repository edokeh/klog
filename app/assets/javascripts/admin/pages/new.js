//= require admin/markdown_editor
//= require admin/attach
$(function() {
    AttachUploader.init();

    AttachUploader.onInsert(function(code) {
        var value = $("#page_content").val();
        var insertPos = $("#page_content").data('inserPos') || $("#page_content").val().length;
        value = value.substr(0, insertPos) + '\r\n' + code + '\r\n' + value.substr(insertPos);
        $("#page_content").val(value);
    });

    $("#page_content").blur(function() {
        if (this.selectionEnd) {
            $(this).data('insertPos', this.selectionEnd);
        }
    });
});