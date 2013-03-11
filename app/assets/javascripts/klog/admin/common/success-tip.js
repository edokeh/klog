/**
 * 成功提示标签
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');

    var successTip = {
        init: function () {
            _.bindAll(this);

            this.$el = $('<div class="alert" id="successTip"><strong></strong></div>');
            this.$el.appendTo('body');
        },

        show: function (text) {
            this.$el.find('strong').text(text);
            this.$el.css('left', ($(window).width() - this.$el.width()) / 2)
            this.$el.show().animate({
                top: '-3px'
            }, 'fast');

            setTimeout(this.hide, 2000);
        },

        hide: function () {
            $('#successTip').animate({
                top: '-40px'
            }, 'fast');
        }
    };

    successTip.init();

    return successTip;
});