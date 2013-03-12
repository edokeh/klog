/**
 * 评论列表
 */
define(function (require) {
    var $ = require('$');
    var PopConfirm = require('../common/pop-confirm');
    require('jquery-ujs');

    var popConfirm = new PopConfirm();
    popConfirm.on('submit', function (link) {
        $.post(link.attr('href'), {
            '_method': 'delete'
        }, function () {
            link.closest('article').hide('normal');
        });
    });

    $('a.delete').click(function (e) {
        e.preventDefault();
        popConfirm.show({
            text: '确定删除这条评论及其回复？',
            trigger: this
        });

        return false;
    });
});