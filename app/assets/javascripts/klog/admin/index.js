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
            $(this).find('.list-btn').fadeIn('fast');
        }, this), 200);
    }, function () {
        $(this).find('.list-btn').hide();
    });
});