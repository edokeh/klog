//预览markdown内容
//约定：预览结果的div必须id为preview，相应的textarea需要有data-preview=true属性

define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Tab = require('tab');
    var Modal = require('gallery/modal/src/modal');
    var AttachUploader = require('../common/attach-uploader');
    var TextareaPos = require('../common/textarea-pos');

    var MarkdownEditor = function (options) {
        _.bindAll(this);

        options = options || {};
        this.textarea = $('.markdown-editor textarea');
        this.previewWrapper = $('.markdown-editor .preview-wrapper');
        this.uploader = new AttachUploader('#uploadHolder', options.uploader);

        this.textarea.focus(this.startSaveTaPos);
        this.textarea.blur(this.stopSaveTaPos);
        this.previewWrapper.height(this.textarea.height() + this.uploader.height()).width(this.textarea.width());
        this.uploader.on('insertCode', this.insertImgCode);

        this.initTab();
        this.initTipModal();
    };

    MarkdownEditor.prototype = {
        constructor: MarkdownEditor,

        // 初始化 tab
        initTab: function () {
            var tab = new Tab('.editor-tabs');
            tab.on('shown', this.changeTab);
        },

        // 初始化语法提示层
        initTipModal: function () {
            var modal = new Modal('#markdownTip');
            $('#popMarkdownTip').click(function () {
                modal.show();
            });
            $(document).keydown(function (e) {
                if (e.which === 77 && e.shiftKey) {  // shift + m
                    modal.show();
                }
            });
        },

        // 切换 tab 的处理
        changeTab: function ($nav) {
            if ($nav.attr('href') === '#markdown_edit') {
                this.showEditor();
            } else if ($nav.attr('href') === '#markdown_preview') {
                this.renderPreview();
            }
        },

        // 显示编辑框
        showEditor: function () {
            this.textarea.focus();
            if (this.previewXHR) {
                this.previewXHR.abort();
            }
        },

        // 发起请求，并渲染预览结果
        renderPreview: function () {
            this.previewWrapper.html('Loading...');
            var content = this.textarea.val();
            var renderFunc = function (html) {
                this.previewWrapper.html(html);
            };
            this.previewXHR = $.post('/admin/preview', {'content': content}, _.bind(renderFunc, this), 'json');
        },

        // 记录 textarea 光标位置
        startSaveTaPos: function () {
            this.posTimer = setInterval(_.bind(function () {
                var rangeData = TextareaPos.get(this.textarea[0]);
                this.textarea.data('rangeData', rangeData);
            }, this));
        },

        // 停止记录 textarea 光标位置
        stopSaveTaPos: function () {
            clearInterval(this.posTimer);
        },

        // 记录 textarea 的光标位置
        saveTextareaPos: function () {
            if (this.textarea[0].selectionEnd) {
                this.textarea.data('insertPos', this.textarea[0].selectionEnd);
            }
        },

        // 插入上传图片的 url md 代码
        insertImgCode: function (code) {
            var rangeData = this.textarea.data('rangeData') || {start: 0, end: 0}
            TextareaPos.insertText(this.textarea[0], rangeData, code);
        }
    };

    return MarkdownEditor;
});

