/**
 * 分类列表 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');
    var CategoryView = require('./category-view');

    var CategoryListView = Backbone.View.extend({
        el: $('table'),

        initialize: function () {
            _.bindAll(this);

            this.collection.on('add', this.add);
            this.collection.on('destroy', this.handleChildDelete);

            this.collection.each(this.add);
        },

        add: function (category) {
            var view = new CategoryView({model: category});
            this.$el.append(view.$el).show();
        },

        // 处理子元素被删除
        handleChildDelete: function (attach) {
            if (this.collection.size() === 0) {
                this.$el.hide();
            }
        }
    });

    return CategoryListView;
});