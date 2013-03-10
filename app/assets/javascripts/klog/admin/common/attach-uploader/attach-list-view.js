/**
 * 附件列表 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');
    var AttachView = require('./attach-view');

    var AttachListView = Backbone.View.extend({
        el: $('.upload-list'),

        initialize: function () {
            _.bindAll(this);

            this.collection.on('add', this.add);
            this.collection.on('destroy', this.handleChildDelete);
        },

        add: function (attach) {
            var view = new AttachView({model: attach});
            this.$el.append(view.$el).show();
        },

        // 处理子元素被删除
        handleChildDelete: function (attach) {
            if (this.collection.size() === 0) {
                this.$el.hide('fast');
            }
        }
    });

    return AttachListView;
});