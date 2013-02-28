//= require swfupload
/**
 * 对swfupload的简单封装，用于单个文件上传，适应本项目
 */
function Uploader(options) {
    this.initialize(options);
}

Uploader.prototype = {
    constructor:Uploader,

    initialize: function(options) {
        $.extend(true, options, Uploader.defaultOption);

        var events = ['start','progress','success'];
        events.forEach(function(e) {
            var _this = this;
            options['upload_' + e + '_handler'] = function() {
                _this._fireEvent(e, arguments);
            };
        }, this);

        this.swfu = new SWFUpload(options);
        this.eventHandlers = {};
    },

    on:function(type, fn) {
        var handlers = this.eventHandlers[type] || (this.eventHandlers[type] = []);
        handlers.push(fn);
        return this;
    },

    _fireEvent:function(type, args) {
        var handlers = this.eventHandlers[type];
        if (handlers) {
            for (var i = 0; i < handlers.length; i++) {
                handlers[i].apply(this, args);
            }
        }
    }
};

Uploader.generateDefaultPostParam = function() {
    var csrfName = $('meta[name=csrf-param]').attr('content');
    var csrfToken = $('meta[name=csrf-token]').attr('content');
    var sessionKey = $('meta[name=session-key]').attr('content');
    var sessionValue = $('meta[name=session-value]').attr('content');

    var postParams = {};
    postParams[csrfName] = csrfToken;
    postParams[sessionKey] = sessionValue;

    return postParams;
};

Uploader.defaultOption = {
    button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,
    flash_url : "/assets/swfupload.swf",

    button_placeholder_id : "upload",
    button_cursor : SWFUpload.CURSOR.HAND,
    button_image_url :  "/assets/upload_button.png",
    button_text_style: ".text{text-align:center;}",
    button_text_top_padding: 7,
    button_text : "<span class='text'>上传附件</span>",
    button_width : 80,
    button_height : 30,
    button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,

    post_params: Uploader.generateDefaultPostParam(),

    file_dialog_complete_handler: function(selected, queued) {
        if (selected > 0 && queued > 0) {
            this.startUpload();
            this.setButtonDisabled(true);
        }
    },

    upload_error_handler: function(file, code, msg) {
        alert("服务器错误！");
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

};