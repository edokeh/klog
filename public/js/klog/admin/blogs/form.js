/**
 * blog 编辑表单
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var MarkdownEditor = require('../common/markdown-editor');
    require('jquery-ujs');

    new MarkdownEditor();

    // 自动保存
    var autoSave = {
        init: function () {
            _.bindAll(this);

            this.form = $('.editor-form');
            this.switcher = $('.auto-save-switch :checkbox');

            this.switcher.click(this.handleSwitch);
            this.form.on('ajax:success', this.showSaveSuccess);
            this.handleSwitch();
        },

        // 处理切换 “自动保存”
        handleSwitch: function () {
            if (this.switcher.prop('checked')) {
                this.saveTimer = setInterval(this.save, 60 * 1000);
            } else {
                clearTimeout(this.saveTimer);
            }
        },

        // 保存
        save: function () {
            if (this.isFormValid()) {
                $.rails.handleRemote(this.form);
                $('.saving').show();
            }
        },

        // 显示保存成功
        showSaveSuccess: function () {
            $('.saving').hide();
            $('.saved').show();
            setTimeout(function () {
                $('.saved').fadeOut('slow');
            }, 1000);

            if (this.form.find('[name="_method"]').size() === 0) {
                this.form.attr('action', '/admin/blogs/' + blog.id);
                this.form.append('<input name="_method" type="hidden" value="put" />');
            }
        },

        // 表单是否合法
        isFormValid: function () {
            return $('#blog_title').val().length >= 3 && $('#blog_content').val().length >= 10;
        }
    };

    autoSave.init();


    // 发布和保存按钮
    $("button[data-status]").click(function (e) {
        $("#blog_status").val($(this).data('status'));
    });

});