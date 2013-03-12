/**
 * 分类列表 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('backbone');
    var CategoryView = require('./category-view');
    var CategoryEditView = require('./category-edit-view');
    require('../common/jquery.color');

    var CategoryListView = Backbone.View.extend({
        el: $('table'),

        initialize: function () {
            _.bindAll(this);

            this.childViews = {};
            this.editView = new CategoryEditView();
            this.emptyRow = this.$('.table-empty-row');

            this.collection.on('add', this.add);
            this.collection.on('destroy', this.handleChildDelete);
            this.collection.on('edit', this.renderEdit);
            this.collection.each(function (category) {
                this.add(category, {noAnim: true});
            }, this);

            if (this.collection.size() === 0) {
                this.emptyRow.show();
            }
        },

        add: function (category, options) {
            var view = new CategoryView({model: category});
            this.$el.append(view.$el);
            this.childViews[category.id] = view;
            this.emptyRow.hide();

            if (!options || !options.noAnim) {
                view.$el.fadeIn('normal', view.animChange);
            }
        },

        renderEdit: function (category) {
            var view = this.childViews[category.id];
            this.editView.setModel(category);
            this.editView.insertAfter(view);
        },

        // 处理子元素被删除
        handleChildDelete: function (category) {
            delete this.childViews[category.id];
        }
    });

    return CategoryListView;
});