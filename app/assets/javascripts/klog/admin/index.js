/**
 * blog 列表
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var PopConfirm = require('./common/pop-confirm');
    require('jquery-ujs');

    setTimeout(function () {
        $('div.alert-success').fadeOut();
    }, 3000);

    var popConfirm = new PopConfirm();

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

//    $('a.delete').click(function (e) {
//        popConfirm.show({
//            text: $(this).data('confirm'),
//            trigger: this
//        });
//        return false;
//    });
//
//    popConfirm.on('submit', function (link) {
//        $.post(link.attr('href'), {
//            '_method': 'delete'
//        }, function () {
//            link.closest('tr').hide('normal');
//        });
//    });
});