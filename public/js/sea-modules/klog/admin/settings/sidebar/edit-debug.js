//预览markdown内容
//约定：预览结果的div必须id为preview，相应的textarea需要有data-preview=true属性
define("klog/admin/common/markdown-editor-debug", [ "./attach-uploader-debug", "./attach-uploader/swfupload-config-debug", "./attach-uploader/attach-debug", "./attach-uploader/attach-list-view-debug", "./attach-uploader/attach-view-debug", "./textarea-pos-debug", "_-debug", "$-debug", "tab-debug", "gallery/modal/src/modal-debug", "backbone-debug", "swfupload-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Tab = require("tab-debug");
    var Modal = require("gallery/modal/src/modal-debug");
    var AttachUploader = require("../common/attach-uploader-debug");
    var TextareaPos = require("../common/textarea-pos-debug");
    var MarkdownEditor = function(options) {
        _.bindAll(this);
        options = options || {};
        this.textarea = $(".markdown-editor textarea");
        this.previewWrapper = $(".markdown-editor .preview-wrapper");
        this.zenMode = $(".markdown-editor-fullscreen");
        this.uploader = new AttachUploader("#uploadHolder", options.uploader);
        this.textarea.focus(this.startSaveTaPos);
        this.textarea.blur(this.stopSaveTaPos);
        this.previewWrapper.height(this.textarea.height() + this.uploader.height()).width(this.textarea.width());
        this.uploader.on("insertCode", this.insertImgCode);
        this.initTab();
        this.initTipModal();
        this.initZenMode();
    };
    MarkdownEditor.prototype = {
        constructor: MarkdownEditor,
        // 初始化 tab
        initTab: function() {
            var tab = new Tab(".editor-tabs");
            tab.on("shown", this.changeTab);
        },
        // 初始化语法提示层
        initTipModal: function() {
            var modal = new Modal("#markdownTip");
            $("#popMarkdownTip").click(function() {
                modal.show();
            });
            $(document).keydown(function(e) {
                if (e.which === 77 && e.shiftKey) {
                    // shift + m
                    modal.show();
                }
            });
        },
        // 初始化 zen mode
        initZenMode: function() {
            $(".zen-mode-trigger").click(this.showZenMode);
            $(".exit-zen-mode").click(this.hideZenMode);
        },
        // 切换 tab 的处理
        changeTab: function($nav) {
            if ($nav.attr("href") === "#markdown_edit") {
                this.showEditor();
            } else if ($nav.attr("href") === "#markdown_preview") {
                this.renderPreview();
            }
        },
        // 显示编辑框
        showEditor: function() {
            this.textarea.focus();
            if (this.previewXHR) {
                this.previewXHR.abort();
            }
        },
        // 发起请求，并渲染预览结果
        renderPreview: function() {
            this.previewWrapper.html("Loading...");
            var content = this.textarea.val();
            var renderFunc = function(html) {
                this.previewWrapper.html(html);
            };
            this.previewXHR = $.post("/admin/preview", {
                content: content
            }, _.bind(renderFunc, this), "json");
        },
        // 记录 textarea 光标位置
        startSaveTaPos: function() {
            this.posTimer = setInterval(_.bind(function() {
                var rangeData = TextareaPos.get(this.textarea[0]);
                this.textarea.data("rangeData", rangeData);
            }, this));
        },
        // 停止记录 textarea 光标位置
        stopSaveTaPos: function() {
            clearInterval(this.posTimer);
        },
        // 记录 textarea 的光标位置
        saveTextareaPos: function() {
            if (this.textarea[0].selectionEnd) {
                this.textarea.data("insertPos", this.textarea[0].selectionEnd);
            }
        },
        // 插入上传图片的 url md 代码
        insertImgCode: function(code) {
            var rangeData = this.textarea.data("rangeData") || {
                start: 0,
                end: 0
            };
            TextareaPos.insertText(this.textarea[0], rangeData, code);
        },
        showZenMode: function() {
            this.zenMode.show();
            this.zenMode.find("textarea").val(this.textarea.val()).focus();
        },
        hideZenMode: function() {
            this.zenMode.hide();
            this.textarea.val(this.zenMode.find("textarea").val()).fodus();
        }
    };
    return MarkdownEditor;
});

/**
 * 附件上传组件
 */
define("klog/admin/common/attach-uploader-debug", [ "./attach-uploader/swfupload-config-debug", "./attach-uploader/attach-debug", "./attach-uploader/attach-list-view-debug", "./attach-uploader/attach-view-debug", "_-debug", "$-debug", "backbone-debug", "swfupload-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var SWFUploader = require("swfupload-debug");
    var swfUploadConfig = require("./attach-uploader/swfupload-config-debug");
    var Attach = require("./attach-uploader/attach-debug");
    var AttachListView = require("./attach-uploader/attach-list-view-debug");
    var AttachUploader = function(buttonHolder, options) {
        _.bindAll(this);
        this.attaches = new Attach.List(attaches_json);
        this.attachListView = new AttachListView({
            collection: this.attaches
        });
        this.attachListView.on("insertCode", function(code) {
            this.trigger("insertCode", code);
        }, this);
        this.initSwfUpload(buttonHolder, options);
    };
    AttachUploader.prototype = {
        constructor: AttachUploader,
        initSwfUpload: function(buttonHolder, options) {
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
        handleStartUpload: function(file) {
            this.attaches.add({
                file_name: file.name
            });
        },
        // 处理上传进度
        handleUploadProgress: function(file, complete, total) {
            var percent = parseInt(complete * 100 / total);
            var attach = this.attaches.last();
            attach.set({
                percent: percent
            });
        },
        // 处理上传成功
        handleUploadSuccess: function(file, data) {
            var result = $.parseJSON(data);
            var attach = this.attaches.last();
            if (result.status == "success") {
                attach.set(result.attach);
            } else {
                attach.destroy();
            }
        },
        // 组件高度
        height: function() {
            return $(".upload-wrapper").height();
        }
    };
    _.extend(AttachUploader.prototype, Backbone.Events);
    // flash 上传时附加的参数
    function getPostParam() {
        var param = {};
        param[$("meta[name=csrf-param]").attr("content")] = $("meta[name=csrf-token]").attr("content");
        param[$("meta[name=session-key]").attr("content")] = $("meta[name=session-value]").attr("content");
        return param;
    }
    return AttachUploader;
});

/**
 * 对于单个文件上传的默认配置
 */
define("klog/admin/common/attach-uploader/swfupload-config-debug", [ "swfupload-debug" ], function(require) {
    var SWFUpload = require("swfupload-debug");
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
});

/**
 * 附件 Model
 */
define("klog/admin/common/attach-uploader/attach-debug", [ "_-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var Backbone = require("backbone-debug");
    Backbone.emulateHTTP = true;
    var Attach = Backbone.Model.extend({
        defaults: {
            percent: 0,
            is_complete: false
        },
        //markdown 的 code
        getCode: function() {
            var url = this.get("url");
            if (this.get("is_image")) {
                var code = "![](" + url + ")";
            } else {
                var code = "[" + this.get("file_name") + "](" + url + ")";
            }
            return code;
        }
    });
    Attach.List = Backbone.Collection.extend({
        model: Attach,
        url: "/admin/attaches"
    });
    return Attach;
});

/**
 * 附件列表 View
 */
define("klog/admin/common/attach-uploader/attach-list-view-debug", [ "./attach-view-debug", "_-debug", "$-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var AttachView = require("./attach-view-debug");
    var AttachListView = Backbone.View.extend({
        el: $(".upload-list"),
        initialize: function() {
            _.bindAll(this);
            this.collection.on("add", this.add);
            this.collection.on("destroy", this.handleChildDelete);
            this.collection.each(this.add);
        },
        add: function(attach) {
            var view = new AttachView({
                model: attach
            });
            this.$el.append(view.$el).show();
            view.on("insertCode", function(code) {
                this.trigger("insertCode", code);
            }, this);
        },
        // 处理子元素被删除
        handleChildDelete: function(attach) {
            if (this.collection.size() === 0) {
                this.$el.hide();
            }
        }
    });
    return AttachListView;
});

/**
 * 附件 View
 */
define("klog/admin/common/attach-uploader/attach-view-debug", [ "_-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var Backbone = require("backbone-debug");
    var temp = '<div class="filename pull-left"><%= file_name %></div><% if(!is_complete) { %><div class="progress progress-striped active pull-left"><div class="bar" style="width:<%= percent %>%"></div></div><% } else { %><div class="handle pull-left" style=""><a href="javascript:void(0);" class="insert">插入</a>&nbsp;&nbsp;|&nbsp;<a href="<%= url %>" target="_blank" class="view">查看</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:void(0);" class="delete" data-method=\'delete\' data-remote="true" data-confirm="确定删除这个附件？">删除</a><input type="hidden" name="attach_ids[]" value="<%= id %>"/></div><% } %>';
    var AttachView = Backbone.View.extend({
        className: "upload-item clearfix",
        template: _.template(temp),
        events: {
            "click .insert": "insertCode",
            "click .delete": "delete"
        },
        initialize: function() {
            _.bindAll(this);
            this.model.on("change:percent", this.renderProcess);
            this.model.on("change:is_complete", this.render);
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        },
        // 渲染进度
        renderProcess: function() {
            var percent = this.model.get("percent");
            this.$(".bar").width(percent + "%");
        },
        "delete": function() {
            if (confirm("确定删除？")) {
                this.model.destroy();
                this.$el.hide("fast", this.remove);
            }
            return false;
        },
        // 点击插入
        insertCode: function() {
            var code = this.model.getCode();
            this.trigger("insertCode", code);
        }
    });
    return AttachView;
});

/**
 * 获取textarea光标位置
 */
define("klog/admin/common/textarea-pos-debug", [], function(require) {
    return {
        get: function(textarea) {
            var rangeData = {
                text: "",
                start: 0,
                end: 0
            };
            if (textarea.setSelectionRange) {
                // W3C
                rangeData.start = textarea.selectionStart;
                rangeData.end = textarea.selectionEnd;
                rangeData.text = rangeData.start != rangeData.end ? textarea.value.substring(rangeData.start, rangeData.end) : "";
            } else if (document.selection) {
                // IE
                var i, oS = document.selection.createRange(), // Don't: oR = textarea.createTextRange()
                oR = document.body.createTextRange();
                oR.moveToElementText(textarea);
                rangeData.text = oS.text;
                rangeData.bookmark = oS.getBookmark();
                // object.moveStart(sUnit [, iCount])
                // Return Value: Integer that returns the number of units moved.
                for (i = 0; oR.compareEndPoints("StartToStart", oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
                    // Why? You can alert(textarea.value.length)
                    if (textarea.value.charAt(i) == "\r") {
                        i++;
                    }
                }
                rangeData.start = i;
                rangeData.end = rangeData.text.length + rangeData.start;
            }
            return rangeData;
        },
        // 设置光标位置
        set: function(textarea, rangeData) {
            var oR, start, end;
            textarea.focus();
            if (textarea.setSelectionRange) {
                // W3C
                textarea.setSelectionRange(rangeData.start, rangeData.end);
            } else if (textarea.createTextRange) {
                // IE
                oR = textarea.createTextRange();
                // Fixbug : ues moveToBookmark()
                // In IE, if cursor position at the end of textarea, the set function don't work
                if (textarea.value.length === rangeData.start) {
                    oR.collapse(false);
                    oR.select();
                } else {
                    oR.moveToBookmark(rangeData.bookmark);
                    oR.select();
                }
            }
        },
        // 根据光标位置插入文本，选中的文字会被替换掉
        insertText: function(textarea, rangeData, text) {
            var oValue, nValue, oR, sR, nStart, nEnd, st;
            this.set(textarea, rangeData);
            if (textarea.setSelectionRange) {
                // W3C
                oValue = textarea.value;
                nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
                nStart = nEnd = rangeData.start + text.length;
                st = textarea.scrollTop;
                textarea.value = nValue;
                // Fixbug:
                // After textarea.values = nValue, scrollTop value to 0
                if (textarea.scrollTop != st) {
                    textarea.scrollTop = st;
                }
                textarea.setSelectionRange(nStart, nEnd);
            } else if (textarea.createTextRange) {
                // IE
                sR = document.selection.createRange();
                sR.text = text;
                sR.setEndPoint("StartToEnd", sR);
                sR.select();
            }
        },
        // 将光标定位到textarea，对于IE不使用focus，而是使用光标定位，所以不会造成窗口抢焦点
        focus: function(textarea) {
            if (textarea.setSelectionRange) {
                textarea.focus();
                textarea.setSelectionRange(0, 0);
            } else if (textarea.createTextRange) {
                var range = textarea.createTextRange();
                range.collapse(true);
                range.moveEnd("character", 0);
                range.moveStart("character", 0);
                range.select();
            }
        }
    };
});

/**
 * blog 编辑表单
 */
define("klog/admin/settings/sidebar/edit-debug", [ "../../common/markdown-editor-debug", "../../common/attach-uploader-debug", "../../common/attach-uploader/swfupload-config-debug", "../../common/attach-uploader/attach-debug", "../../common/attach-uploader/attach-list-view-debug", "../../common/attach-uploader/attach-view-debug", "../../common/textarea-pos-debug", "$-debug", "_-debug", "tab-debug", "gallery/modal/src/modal-debug", "backbone-debug", "swfupload-debug", "jquery-ujs-debug" ], function(require) {
    var $ = require("$-debug");
    var MarkdownEditor = require("../../common/markdown-editor-debug");
    require("jquery-ujs-debug");
    new MarkdownEditor({
        uploader: {
            post_params: {
                "attach[max_width]": 200
            }
        }
    });
});