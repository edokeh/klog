/**
 * 前台博客展示
 */
define(function (require, exports) {
    var _ = require('_');
    var $ = require('$');
    require('jquery.color');
    var commentForm = require('./comment-form');

    commentForm.init();
    $(document).on('click', 'a.reply-comment', function () {
        commentForm.replyTo($(this));
    });

    //根据锚点高亮闪烁对应的评论
    if (/^#comments_(\d+)$/.test(location.hash)) {
        var header = $(location.hash).find('header');
        var i = 0;
        var blinkA = function () {
            if (i++ < 3) {
                header.animate({backgroundColor: "#fcf8e3"}, 'normal', 'linear', blinkB);
            }
        }
        var blinkB = function () {
            header.animate({backgroundColor: "#eee"}, 'normal', 'linear', blinkA);
        }
        blinkA();
    }


    // 增加对 admin 的支持
    if (IS_ADMIN) {
        require.async('../admin/common/pop-confirm', function (PopConfirm) {
            var popConfirm = new PopConfirm();

            $('#commentsWrapper').on('click', 'a.delete', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var link = $(this);
                popConfirm.show({
                    text: '确定删除？',
                    trigger: this
                });
                popConfirm.off().on('submit', function () {
                    link.trigger('click.rails');
                });
                return false;
            });

            $(document).on('ajax:success', 'a.delete', function () {
                $(this).closest('article').hide('normal');
            });

            $(document).on('ajax:error', 'a.delete', function () {
                if (confirm('出错啦！刷新下页面吧？')) {
                    location.reload();
                }
            });
        });
    }
});