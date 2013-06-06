/**
 * 列表
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var PopConfirm = require('./common/pop-confirm');

    setTimeout(function () {
        $('div.alert-success').fadeOut();
    }, 3000);

    var popConfirm = new PopConfirm();

    // 为 data-pop-confirm 元素增加行为
    $('a[data-pop-confirm]').click(function () {
        var link = $(this);
        popConfirm.show({
            text: link.data('popConfirm'),
            trigger: this
        });
        popConfirm.off().on('submit', function () {
            link.trigger('click.rails');
        });
        return false;
    });

    $('a.delete').on('ajax:success', function () {
        $(this).closest('tr').hide('normal');
    });
});