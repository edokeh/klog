/**
 * 前台博客展示
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    require('./common/jquery-color');
    require('jquery-ujs');

    var commentForm = {
        init: function () {
            _.bindAll(this);
            this.$el = $('#new_comment');
            this.$el.on('ajax:success', this.handleSubmit);
            $('#submitComment').click(this.submit);
            $('#cancelReply').click(this.cancelReply);
            $('#captcha').on('focus blur', this.toggleCaptcha);
            setInterval(this.enableSubmit, 500);
        },

        // 处理服务器返回
        handleSubmit: function (e, data) {
            if (data.success) {
                this.cancelReply();
                $('#comment_content').val('');
                $('#commentsWrapper').load(this.$el.attr('action'));
            } else {
                alert(data.errors);
                $('#submitComment').removeClass('disabled');
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

        // 退出评论
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

    var formTip = {
        init: function () {
            this.$el = $('<div class="commentTip"><i class="icon-ok icon-white"></i> <span></span></div>').appendTo('body');
        },

        show: function (options) {
            var triggerPos = options.trigger.position();
            this.$el.find('span').text(options.text);
            this.$el.css({
                top: triggerPos.top + 'px',
                left: triggerPos.left + 'px'
            }).show();
        }
    }

    formTip.init();
    formTip.show({
        text: '评论成功！',
        trigger: $('#submitComment')
    });
    commentForm.init();

    $(document).on('click', 'a.reply-comment', function () {
        commentForm.replyTo($(this));
    });
});