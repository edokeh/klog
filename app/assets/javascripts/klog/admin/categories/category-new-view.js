/**
 * 新建分类 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');

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
            this.el.reset();
        },

        showError: function (model, xhr, options) {
            var txt = $.parseJSON(xhr.responseText);
            this.$('.tooltip-inner').text(txt[0]);
            this.$('.tooltip').removeClass('out').addClass('in');
            setTimeout(this.hideError, 2000);
        },

        hideError:function(){
            this.$('.tooltip').removeClass('in').addClass('out');
        }

    });

    return CategoryNewView;
});