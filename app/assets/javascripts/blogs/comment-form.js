/**
 * 评论表单
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var commentTip = require('./comment-tip');

    commentTip.init();

    var commentForm = {
        init: function () {
            _.bindAll(this);
            this.$el = $('#new_comment');
            this.$el.on('ajax:success', this.handleSubmit);
            $('#submitComment').click(this.submit);
            $('#cancelReply').click(this.cancelReply);
            $('#captcha').on('focus blur', this.toggleCaptcha);
            $('#comment_content').keydown(this.handleHotkey);
            setInterval(this.enableSubmit, 500);
        },

        // 处理服务器返回
        handleSubmit: function (e, data) {
            if (data.success) {
                this.cancelReply();
                $('#comment_content').val('');
                $('#commentsWrapper').load(this.$el.attr('action'));
                commentTip.show({success: '评论成功！'});
            } else {
                $('#submitComment').removeClass('disabled');
                commentTip.show({error: data.errors});
            }
        },

        // ctrl + enter 的热键
        handleHotkey: function (e) {
            if (e.which === 13 && e.ctrlKey) {
                $('#submitComment').click();
            }
        },

        submit: function (e) {
            if ($('#submitComment').hasClass('disabled')) {
                e.preventDefault();
            } else {
                $('#submitComment').addClass('disabled');
            }
        },

        // 对某条评论回复
        replyTo: function (trigger) {
            this.$el.css('margin-left', '20px').insertAfter(trigger.parent());
            $('#cancelReply').show();
            $('#comment_commentable_id').val(trigger.data('commentid'));
            $('#comment_commentable_type').val('Comment');
            $('#comment_content').focus();
        },

        // 退出回复
        cancelReply: function () {
            this.$el.css('margin-left', 0).insertAfter('#commentsWrapper');
            $('#cancelReply').hide();
            $('#comment_commentable_id').val($('#comment_commentable_id').data('origin'));
            $('#comment_commentable_type').val('Blog');
        },

        // 显示隐藏注册码
        toggleCaptcha: function () {
            var position = $('#captcha').position();
            $('#captcha').next().toggle('fast').css({
                left: position.left + 10,
                top: position.top - 40
            });
        },

        //检查评论内容是否符合校验, 如果符合则 enable 提交按钮
        enableSubmit: function () {
            var isValid = _($('#comment_content, #comment_nick, #comment_email, #captcha')).every(function (input) {
                return $.trim(input.value).length > 0;
            });
            $('#submitComment').toggleClass('btn-primary', isValid).toggleClass('disabled', !isValid);
            $('#submitComment').find('i').toggleClass('icon-white', isValid);
        }
    };

    return commentForm;
});