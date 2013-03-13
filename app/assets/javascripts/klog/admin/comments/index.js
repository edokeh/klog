/**
 * 评论列表
 */
define(function (require) {
    var $ = require('$');
    var PopConfirm = require('../common/pop-confirm');
    require('jquery-ujs');

    var popConfirm = new PopConfirm();

    $('a.delete').click(function () {
        var link = $(this);
        popConfirm.show({
            text: '确定删除这条评论及其回复？',
            trigger: this
        });
        popConfirm.off().on('submit', function () {
            link.trigger('click.rails');
        });
        return false;
    });

    $('a.delete').on('ajax:success', function () {
        $(this).closest('article').hide('normal');
    });
});