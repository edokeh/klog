//= require jquery.iframe-transport
//= require uploader
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
    var postParams = {};
    postParams[csrfName] = csrfToken;

//    var uploader = new Uploader({
//        'url':'/admin/attaches',
//        'post_name':'file',
//        'post_params': postParams
//    });
//
//    $("#upload").click(function() {
//        uploader.selectAndUpload();
//    });

    $("#upload").click(function() {
        $("#sb").click();
    });

    $("#sb").change(function() {
        $.ajax({
            'dataType':'iframe json',
            'paramName':'file',
            'fileInput':$("#sb"),
            'url':'/admin/attaches',
            'type':'POST',
            'formData':[
                {
                    'name':csrfName,
                    'value':csrfToken
                }
            ]

        }).done(function(xx){
            alert(xx);
        });

    })

//    $("#ajax_file").change(function(){
//       $(this).parent().submit();
//    });
//
//    $("#ajax_frame").on('load',function(){
//        var response = $(this).contents();
//        alert(response.text());
//    });

//    var swfu = new SWFUpload({
//        upload_url : "/admin/attaches",
//        button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
//        file_post_name: "file",
//        flash_url : "/assets/swfupload.swf",
//        file_size_limit : "5 MB",
//        button_placeholder_id : "upload",
//        button_image_url :  "/assets/XPButtonNoText_61x22.png",
//        button_text_style: ".text{text-align:center}",
//        button_text : "<span class='text'>上传</span>",
//        button_width : 61,
//        button_height : 22,
//        file_types : "*.jpg;*.gif;*.png;*.rar;*.zip",
//
//
//        file_dialog_complete_handler: function(selected, queued) {
//            this.startUpload();
//            this.setButtonDisabled(true);
//        },
//
//        upload_progress_handler: function(file, complete, total) {
//            var tmp = parseInt(complete * 100 / total);
//            this.setButtonText("<span class='text'>上传中 (" + tmp + "%)</span>");
//        },
//        upload_error_handler: function(file, code, msg) {
//            alert("服务器错误！");
//        },
//        upload_complete_handler: function() {
//            this.setButtonDisabled(false);
//            this.setButtonText("<span class='text'>上传</span>");
//        },
//        file_queue_error_handler: function(file, code, msg) {
//            var error;
//            switch (code) {
//                case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
//                    error = "文件不能超过" + this.settings.file_size_limit;
//                    break;
//                case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
//                    error = "不能上传空文件！";
//                    break;
//                case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
//                    error = "文件类型有误！";
//                    break;
//            }
//            alert(error);
//        }
//    });


})
        ;