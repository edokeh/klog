/**
 * 前台博客展示
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    require('./common/jquery-color');
    require('jquery-ujs');
    var commentForm = require('./comment-form');

    commentForm.init();

    $(document).on('click', 'a.reply-comment', function () {
        commentForm.replyTo($(this));
    });
});