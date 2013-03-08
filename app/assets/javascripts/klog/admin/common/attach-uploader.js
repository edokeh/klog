/**
 * 附件上传组件
 */
define(function (require) {
    var SWFUploader = require('swfuploader');
    var AttachList = require('./attach-uploader/attach-list');
    var AttachListView = require('./attach-uploader/attach-list-view');

    var AttachUploader = function (options) {
        options = options || {};
        var _this = this;

        new AttachListView({'collection': new AttachList()});

        attaches_json.forEach(function (a) {
            attaches.add(a);
        });

        var uploader = new Uploader({
            upload_url: "/admin/attaches",
            file_post_name: "attach[file]",
            file_size_limit: "5 MB",
            file_types: "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx",

            post_params: options['post_params'] || {}
        });

        uploader.on('start', function (file) {
            attaches.add({'file_name': file.name});
        });

        uploader.on('progress', function (file, complete, total) {
            var percent = parseInt(complete * 100 / total);
            var attach = attaches.last();
            attach.set({'percent': percent});
        });

        uploader.on('success', function (file, data) {
            var result = $.parseJSON(data);
            var attach = attaches.last();
            if (result.status == 'success') {
                attach.set(result.attach);
            } else {
                attach.destroy();
            }
        });

        $(document).on('click', 'a.delete', function (e) {
            $(this).closest('.upload-item').remove();
            if ($('.upload-item').length === 0) {
                $('.upload-list').hide('fast');
            }
        });

        this._initSwf();
    };

    AttachUploader.prototype = {
        constructor: AttachUploader,

        _initSwfUpload: function () {

        }
    };

    AttachUploader.defaultSwfUploadConfig = {
        button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
        button_placeholder_id: "upload",
        button_cursor: SWFUpload.CURSOR.HAND,
        button_image_url: "/assets/upload_button.png",
        button_text_style: ".text{text-align:center;}",
        button_text_top_padding: 7,
        button_text: "<span class='text'>上传附件</span>",
        button_width: 80,
        button_height: 30,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,

        post_params: Uploader.generateDefaultPostParam(),

        file_dialog_complete_handler: function (selected, queued) {
            if (selected > 0 && queued > 0) {
                this.startUpload();
                this.setButtonDisabled(true);
            }
        },

        upload_error_handler: function (file, code, msg) {
            alert("服务器错误！");
        },
        upload_complete_handler: function () {
            this.setButtonDisabled(false);
        },

        file_queue_error_handler: function (file, code, msg) {
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
    };


    return AttachUploader;
});