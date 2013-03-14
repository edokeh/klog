/**
 * 弹出式的确认框
 */
define("klog/admin/common/pop-confirm-debug", [ "_-debug", "$-debug", "events-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Events = require("events-debug");
    var html = '<div class="pop-confirm"><div class="pop-confirm-inner clearfix"><div class="pop-confirm-content"></div><div class="pull-right"><a class="btn btn-small btn-primary submit">确定</a>&nbsp;<a class="btn btn-small cancel">取消</a></div></div></div>';
    var PopConfirm = function() {
        _.bindAll(this);
        this.$el = $(html).appendTo("body");
        this.$el.find(".cancel, .submit").click(this.hide);
        this.$el.find(".submit").click(this.triggerSubmit);
        Events.mixTo(this);
    };
    PopConfirm.prototype = {
        constructor: PopConfirm,
        // 显示，传入参数为 {text,trigger}
        show: function(options) {
            if (this.$el.is(":animated")) {
                return;
            }
            this.$el.find(".pop-confirm-content").text(options.text);
            this.$trigger = $(options.trigger);
            var height = this.$el.height();
            var triggerPos = this.$trigger.position();
            var triggerHeight = this.$trigger.outerHeight();
            this.$el.css({
                left: triggerPos.left - this.$el.width() * .4 + "px",
                top: triggerPos.top + "px",
                visibility: "visible",
                height: 0
            });
            this.$el.animate({
                height: height,
                top: "-=" + height + "px"
            }, "fast");
        },
        hide: function() {
            var height = this.$el.height();
            this.$el.animate({
                height: 0,
                top: "+=" + height + "px"
            }, "fast", function() {
                $(this).css({
                    visibility: "hidden",
                    height: "auto"
                });
            });
            this.isShown = false;
        },
        triggerSubmit: function() {
            this.trigger("submit", this.$trigger);
        }
    };
    return PopConfirm;
});

/**
 * 评论列表
 */
define("klog/admin/comments/index-debug", [ "../common/pop-confirm-debug", "$-debug", "_-debug", "events-debug", "jquery-ujs-debug" ], function(require) {
    var $ = require("$-debug");
    var PopConfirm = require("../common/pop-confirm-debug");
    require("jquery-ujs-debug");
    var popConfirm = new PopConfirm();
    $("a.delete").click(function() {
        var link = $(this);
        popConfirm.show({
            text: "确定删除这条评论及其回复？",
            trigger: this
        });
        popConfirm.off().on("submit", function() {
            link.trigger("click.rails");
        });
        return false;
    });
    $("a.delete").on("ajax:success", function() {
        $(this).closest("article").hide("normal");
    });
});