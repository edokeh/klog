define("gallery/tab/0.0.1/tab-debug", [ "_-debug", "$-debug", "events-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Events = require("events-debug");
    // 传入 nav 元素
    var Tab = function(element) {
        _.bindAll(this);
        this.$el = $(element);
        this.bindEvents();
        Events.mixTo(this);
    };
    Tab.prototype = {
        constructor: Tab,
        bindEvents: function() {
            this.$el.find("a").click(this.handleTabClick);
        },
        handleTabClick: function(e) {
            e.preventDefault();
            var $nav = $(e.target);
            this.changeTab($nav);
        },
        changeTab: function($nav) {
            if ($nav.hasClass("active")) {
                return;
            }
            $nav.parent().addClass("active");
            $nav.parent().siblings().removeClass("active");
            var $target = $($nav.attr("href"));
            $target.show();
            $target.siblings().hide();
            this.trigger("shown", $nav);
        }
    };
    return Tab;
});