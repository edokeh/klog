/**
 * 新建分类 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');
    var successTip = require('../common/success-tip');

    var CategoryNewView = Backbone.View.extend({
        el: $('#new_category'),

        events: {
            'submit': 'createCategory'
        },

        initialize: function () {
            _.bindAll(this);
        },

        // 添加
        createCategory: function (e) {
            e.preventDefault();
            this.collection.create({
                name: this.$('[name="category[name]"]').val()
            }, {
                wait: true,
                success: this.showSuccess,
                error: this.showError
            });
        },

        showSuccess: function (model, resp, options) {
            successTip.show('添加成功！');
            this.el.reset();
        },

        showError: function (model, xhr, options) {

        }

    });

    return CategoryNewView;
});