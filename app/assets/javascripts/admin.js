//= require jquery
//= require jquery_ujs
//= require es5-safe-debug
$(function() {
    setTimeout(function() {
        $('div.alert-success').fadeOut();
    }, 3000);

    var timer;
    $('td').hover(function(e) {
        var _this = this;
        clearTimeout(timer);
        timer = setTimeout(function() {
            $(_this).addClass('hover');
        }, 300);

    }, function(e) {
        var _this = this;
        clearTimeout(timer);
        setTimeout(function() {
            $(_this).removeClass('hover');
        }, 300);
    });
});