/**
 * 弹出式的确认框
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Events = require('events');
    var html = require('./pop-upload.html');

    var PopConfirm = function () {
        _.bindAll(this);

        this.$el = $(html).appendTo('body');
        this.$el.find('.cancel, .submit').click(this.hide);
        this.$el.find('.submit').click(this.triggerSubmit);

        Events.mixTo(this);
    };

    PopConfirm.prototype = {
        constructor: PopConfirm,

        // 显示，传入参数为 {text,trigger}
        show: function (options) {
            if (this.$el.is(':animated')) {
                return;
            }
            this.$el.find('.pop-confirm-content').text(options.text);
            this.$trigger = $(options.trigger);
            var height = this.$el.height();
            var triggerPos = this.$trigger.position();
            var triggerHeight = this.$trigger.outerHeight();
            this.$el.css({
                left: triggerPos.left - this.$el.width() * 0.4 + "px",
                top: triggerPos.top + "px",
                visibility: 'visible',
                height: 0
            });
            this.$el.animate({
                height: height,
                top: '-=' + height + 'px'
            }, 'fast');
        },

        hide: function () {
            var height = this.$el.height();
            this.$el.animate({
                height: 0,
                top: '+=' + height + 'px'
            }, 'fast', function () {
                $(this).css({
                    visibility: 'hidden',
                    height: 'auto'
                });
            });
            this.isShown = false;
        },

        triggerSubmit: function () {
            this.trigger('submit', this.$trigger);
        }
    };

    return PopConfirm;
});