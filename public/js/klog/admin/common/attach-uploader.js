/**
 * 附件上传组件
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('backbone');
    var SWFUploader = require('swfupload');
    var swfUploadConfig = require('./attach-uploader/swfupload-config');
    var Attach = require('./attach-uploader/attach');
    var AttachListView = require('./attach-uploader/attach-list-view');

    var AttachUploader = function (buttonHolder, options) {
        _.bindAll(this);

        this.attaches = new Attach.List(attaches_json);
        this.attachListView = new AttachListView({'collection': this.attaches});
        this.attachListView.on('insertCode', function (code) {
            this.trigger('insertCode', code);
        }, this);

        this.initSwfUpload(buttonHolder, options);
    };

    AttachUploader.prototype = {
        constructor: AttachUploader,

        initSwfUpload: function (buttonHolder, options) {
            var config = _.extend(swfUploadConfig, {
                upload_url: "/admin/attaches",
                file_post_name: "attach[file]",
                file_size_limit: "5 MB",
                file_types: "*.jpg;*.jpeg;*.gif;*.png;*.txt;*.zip;*.rar;*.ppt;*.pptx;",
                button_placeholder: $(buttonHolder)[0],
                post_params: getPostParam(),

                upload_start_handler: this.handleStartUpload,
                upload_progress_handler: this.handleUploadProgress,
                upload_success_handler: this.handleUploadSuccess
            });

            if (options && options.post_params) {
                _.extend(config.post_params, options.post_params);
            }

            this.swfu = new SWFUpload(config);
        },

        // 开始上传，新建 attach model
        handleStartUpload: function (file) {
            this.attaches.add({'file_name': file.name});
        },

        // 处理上传进度
        handleUploadProgress: function (file, complete, total) {
            var percent = parseInt(complete * 100 / total);
            var attach = this.attaches.last();
            attach.set({'percent': percent});
        },

        // 处理上传成功
        handleUploadSuccess: function (file, data) {
            var result = $.parseJSON(data);
            var attach = this.attaches.last();
            if (result.status == 'success') {
                attach.set(result.attach);
            } else {
                attach.destroy();
            }
        },

        // 组件高度
        height: function () {
            return $('.upload-wrapper').height();
        }

    };

    _.extend(AttachUploader.prototype, Backbone.Events);

    // flash 上传时附加的参数
    function getPostParam() {
        var param = {};
        param[$('meta[name=csrf-param]').attr('content')] = $('meta[name=csrf-token]').attr('content');
        param[$('meta[name=session-key]').attr('content')] = $('meta[name=session-value]').attr('content');
        return param;
    }

    return AttachUploader;
});