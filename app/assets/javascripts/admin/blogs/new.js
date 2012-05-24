//= require swfupload
//= require mustache
$(function() {
    $("button[data-status]").click(function(e) {
        $("#blog_status").val($(this).data('status'));
    });

    $("#preview").height($("#blog_content").height());
    $("#preview").width($("#blog_content").width());

    $(".nav li").click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $('#preview').html('Loading...');
        $('#preview,#blog_content').toggle();
        if ($(this).data("type") === 'preview') {
            var content = $("#blog_content").val();
            $.post("/admin/blogs/preview", {'content':content}, function(html) {
                $('#preview').html(html).show();
                $('#blog_content').hide();
            }, 'json');
        } else {
            $('#blog_content').focus();
        }
    });

    var csrfName = $('meta[name=csrf-param]').attr('content');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    var sessionKey = $('meta[name=session-key]').attr('content');
    var sessionValue = $('meta[name=session-value]').attr('content');
    var postParams = {};
    postParams[csrfName] = csrfToken;
    postParams[sessionKey] = sessionValue;

    var swfu = new SWFUpload({
        upload_url : "/admin/attaches",
        button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
        file_post_name: "file",
        flash_url : "/assets/swfupload.swf",
        file_size_limit : "10 MB",

        button_placeholder_id : "upload",
        button_cursor : SWFUpload.CURSOR.HAND,
        button_image_url :  "/assets/upload_button.png",
        button_text_style: ".text{text-align:center;}",
        button_text_top_padding: 4,
        button_text : "<span class='text'>选择文件</span>",
        button_width : 80,
        button_height : 30,
        button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,

        file_types : "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx",
        post_params:postParams,


        file_dialog_complete_handler: function(selected, queued) {
            if (selected > 0 && queued > 0) {
                this.startUpload();
                this.setButtonDisabled(true);
            }
        },

        upload_start_handler:function(file) {
            var template = $("#upload-list-temp").html();
            var json = {'filename':file.name};
            var html = Mustache.to_html(template, json).replace(/^\s*/mg, '');
            $(html).appendTo("table.upload-list");
        },

        upload_progress_handler: function(file, complete, total) {
            var percent = parseInt(complete * 100 / total);
            $('table.upload-list tr:last').find('.bar').width(percent + '%');
        },

        upload_error_handler: function(file, code, msg) {
            alert("服务器错误！");
        },

        upload_success_handler:function(file, data) {
            var result = $.parseJSON(data);
            if (result.status == 'success') {
                var tr = $('table.upload-list tr:last');
                tr.find('.progress').hide();
                tr.find('.handle').show();
                tr.find('a[data-insert]').data('insert', result.filepath).data('is_image', result.is_image).data('filename', file.name);
                tr.find('a[data-method=delete]').prop('href', '/admin/attaches/' + result.attach_id);
            } else {

            }
        },

        upload_complete_handler: function() {
            this.setButtonDisabled(false);
        },

        file_queue_error_handler: function(file, code, msg) {
            var error;
            switch (code) {
                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                    error = "文件不能超过" + this.settings.file_size_limit;
                    break;
                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                    error = "不能上传空文件！";
                    break;
                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                    error = "文件类型有误！";
                    break;
            }
            alert(error);
        }
    });

    $(".upload-list").on('click', 'a[data-insert]', function() {
        var url = $(this).data('insert');
        if ($(this).data('is_image')) {
            var code = '![](' + url + ')';
        } else {
            var code = '[' + $(this).data("filename") + '](' + url + ')';
        }

        $("#blog_content").val($("#blog_content").val() + code);
    });

    $(".upload-list").on('click', 'a[data-delete]', function() {
        $(this).closest('tr').remove();
    });
});