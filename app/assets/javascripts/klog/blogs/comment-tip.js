/**
 * 评论的提示
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');

    var commentTip = {
        init: function () {
            _.bindAll(this);
            this.$el = $('<div class="comment-tip"><i class="icon-white"></i> <span></span></div>').appendTo('#new_comment');
            this.calcPos();
        },

        calcPos: function () {
            var pos = $('#comment_content').position();
            var height = $('#comment_content').outerHeight();
            var width = $('#comment_content').outerWidth();

            this.left = pos.left + width / 2;
            this.top = pos.top + height / 2;
        },

        show: function (options) {
            if (options.success) {
                this.$el.find('span').text(options.success);
                this.$el.find('i').addClass('icon-ok').removeClass('icon-exclamation-sign');
            } else if (options.error) {
                this.$el.find('span').text(options.error);
                this.$el.find('i').addClass('icon-exclamation-sign').removeClass('icon-ok');
            }

            var elHeight = this.$el.outerHeight();
            var elWidth = this.$el.outerWidth();
            this.$el.css({
                top: this.top - elHeight * 0.5 + 'px',
                left: this.left - elWidth * 0.5 + 'px',
                visibility: 'visible'
            }).fadeIn();


            setTimeout(this.hide, 1500);
        },

        hide: function () {
            this.$el.fadeOut();
        }
    }

    return commentTip;
});
