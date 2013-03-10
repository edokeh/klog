/**
 * 附件上传组件
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');
    var SWFUploader = require('swfupload');
    var swfConfig = require('./attach-uploader/swfupload-config');
    var Attach = require('./attach-uploader/attach');
    var AttachListView = require('./attach-uploader/attach-list-view');

    var AttachUploader = function (buttonHolder) {
        _.bindAll(this);

        this.attaches = new Attach.List(attaches_json);
        new AttachListView({'collection': this.attaches});

        this.initSwfUpload(buttonHolder);
    };

    AttachUploader.prototype = {
        constructor: AttachUploader,

        initSwfUpload: function (buttonHolder) {
            var config = _.extend(swfConfig, {
                upload_url: "/admin/attaches",
                file_post_name: "attach[file]",
                file_size_limit: "5 MB",
                file_types: "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx",
                button_placeholder: $(buttonHolder)[0],
                post_params: getPostParam(),

                upload_start_handler: this.handleStartUpload,
                upload_progress_handler: this.handleUploadProgress,
                upload_success_handler: this.handleUploadSuccess
            });

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
        }
    };

    // flash 上传时附加的参数
    function getPostParam() {
        var param = {};
        param[$('meta[name=csrf-param]').attr('content')] = $('meta[name=csrf-token]').attr('content');
        param[$('meta[name=session-key]').attr('content')] = $('meta[name=session-value]').attr('content');
        return param;
    }

    return AttachUploader;
});