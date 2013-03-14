/**
 * 评论表单
 */
define("klog/blogs/comment-form-debug", [ "./comment-tip-debug", "_-debug", "$-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var commentTip = require("./comment-tip-debug");
    commentTip.init();
    var commentForm = {
        init: function() {
            _.bindAll(this);
            this.$el = $("#new_comment");
            this.$el.on("ajax:success", this.handleSubmit);
            $("#submitComment").click(this.submit);
            $("#cancelReply").click(this.cancelReply);
            $("#captcha").on("focus blur", this.toggleCaptcha);
            $("#comment_content").keydown(this.handleHotkey);
            setInterval(this.enableSubmit, 500);
        },
        // 处理服务器返回
        handleSubmit: function(e, data) {
            if (data.success) {
                this.cancelReply();
                $("#comment_content").val("");
                $("#commentsWrapper").load(this.$el.attr("action"));
                commentTip.show({
                    success: "评论成功！"
                });
            } else {
                $("#submitComment").removeClass("disabled");
                commentTip.show({
                    error: data.errors
                });
            }
        },
        // ctrl + enter 的热键
        handleHotkey: function(e) {
            if (e.which === 13 && e.ctrlKey) {
                $("#submitComment").click();
            }
        },
        submit: function(e) {
            if ($("#submitComment").hasClass("disabled")) {
                e.preventDefault();
            } else {
                $("#submitComment").addClass("disabled");
            }
        },
        // 对某条评论回复
        replyTo: function(trigger) {
            this.$el.css("margin-left", "20px").insertAfter(trigger.parent());
            $("#cancelReply").show();
            $("#comment_commentable_id").val(trigger.data("commentid"));
            $("#comment_commentable_type").val("Comment");
            $("#comment_content").focus();
        },
        // 退出回复
        cancelReply: function() {
            this.$el.css("margin-left", 0).insertAfter("#commentsWrapper");
            $("#cancelReply").hide();
            $("#comment_commentable_id").val($("#comment_commentable_id").data("origin"));
            $("#comment_commentable_type").val("Blog");
        },
        // 显示隐藏注册码
        toggleCaptcha: function() {
            var position = $("#captcha").position();
            $("#captcha").next().toggle("fast").css({
                left: position.left + 10,
                top: position.top - 40
            });
        },
        //检查评论内容是否符合校验, 如果符合则 enable 提交按钮
        enableSubmit: function() {
            var isValid = _($("#comment_content, #comment_nick, #comment_email, #captcha")).every(function(input) {
                return $.trim(input.value).length > 0;
            });
            $("#submitComment").toggleClass("btn-primary", isValid).toggleClass("disabled", !isValid);
            $("#submitComment").find("i").toggleClass("icon-white", isValid);
        }
    };
    return commentForm;
});

/**
 * 评论的提示
 */
define("klog/blogs/comment-tip-debug", [ "_-debug", "$-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var commentTip = {
        init: function() {
            _.bindAll(this);
            this.$el = $('<div class="comment-tip"><i></i> <span></span></div>').appendTo("#new_comment");
            this.calcPos();
        },
        calcPos: function() {
            var pos = $("#comment_content").position();
            var height = $("#comment_content").outerHeight();
            var width = $("#comment_content").outerWidth();
            this.left = pos.left + width / 2;
            this.top = pos.top + height / 2;
        },
        show: function(options) {
            if (options.success) {
                this.$el.find("span").text(options.success);
                this.$el.find("i").attr("class", "icon-ok icon-white");
            } else if (options.error) {
                this.$el.find("span").text(options.error);
                this.$el.find("i").attr("class", "icon-exclamation-sign icon-white");
            }
            var elHeight = this.$el.outerHeight();
            var elWidth = this.$el.outerWidth();
            this.$el.css({
                top: this.top - elHeight * .5 + "px",
                left: this.left - elWidth * .5 + "px",
                visibility: "visible"
            }).fadeIn();
            setTimeout(this.hide, 1500);
        },
        hide: function() {
            this.$el.fadeOut();
        }
    };
    return commentTip;
});

/**
 * 前台博客展示
 */
define("klog/blogs/show-debug", [ "./comment-form-debug", "./comment-tip-debug", "_-debug", "$-debug", "jquery.color-debug", "jquery-ujs-debug" ], function(require, exports) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    require("jquery.color-debug");
    require("jquery-ujs-debug");
    var commentForm = require("./comment-form-debug");
    commentForm.init();
    $(document).on("click", "a.reply-comment", function() {
        commentForm.replyTo($(this));
    });
    //根据锚点高亮闪烁对应的评论
    if (/^#comments_(\d+)$/.test(location.hash)) {
        var header = $(location.hash).find("header");
        var i = 0;
        var blinkA = function() {
            if (i++ < 3) {
                header.animate({
                    backgroundColor: "#fcf8e3"
                }, "normal", "linear", blinkB);
            }
        };
        var blinkB = function() {
            header.animate({
                backgroundColor: "#eee"
            }, "normal", "linear", blinkA);
        };
        blinkA();
    }
    // 增加对 admin 的支持
    if (IS_ADMIN) {
        require.async("../admin/common/pop-confirm-debug", function(PopConfirm) {
            var popConfirm = new PopConfirm();
            $("#commentsWrapper").on("click", "a.delete", function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var link = $(this);
                popConfirm.show({
                    text: "确定删除？",
                    trigger: this
                });
                popConfirm.off().on("submit", function() {
                    link.trigger("click.rails");
                });
                return false;
            });
            $(document).on("ajax:success", "a.delete", function() {
                $(this).closest("article").hide("normal");
            });
            $(document).on("ajax:error", "a.delete", function() {
                if (confirm("出错啦！刷新下页面吧？")) {
                    location.reload();
                }
            });
        });
    }
});