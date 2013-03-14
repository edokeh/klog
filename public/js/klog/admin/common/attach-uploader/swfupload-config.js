/**
 * 对于单个文件上传的默认配置
 */
define(function (require) {
    var SWFUpload = require('swfupload');

    return {
        flash_url: SWFUpload.defaultFlashUrl,
        button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
        button_cursor: SWFUpload.CURSOR.HAND,
        button_image_url: "/assets/upload_button.png",
        button_text_style: ".text{text-align:center;}",
        button_text_top_padding: 7,
        button_text: "<span class='text'>上传附件</span>",
        button_width: 80,
        button_height: 30,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,

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
    }
});