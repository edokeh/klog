/**
 * blog 列表
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    require('jquery-ujs');

    setTimeout(function () {
        $('div.alert-success').fadeOut();
    }, 3000);

    var timer;
    $('td').hover(function () {
        clearTimeout(timer);
        timer = setTimeout(_.bind(function () {
            $(this).find('.list-action').fadeIn('fast');
        }, this), 10);
    }, function () {
        $(this).find('.list-action').hide();
    });
});