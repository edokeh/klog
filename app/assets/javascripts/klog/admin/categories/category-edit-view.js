/**
 * 分类 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');

    var CategoryEditView = Backbone.View.extend({
        el: '#categoryEditView',

        events: {
            'click .cancel-edit': 'cancelEdit',
            'submit form': 'update'
        },

        initialize: function () {
            _.bindAll(this);

        },

        setModel: function (model) {
            this.cancelEdit();
            this.model = model;
            this.render();
        },

        render: function () {
            this.$('[name="categroy[name]"]').val(this.model.get('name'));
        },

        cancelEdit: function () {
            if (this.tmpView) {
                this.$el.hide();
                this.tmpView.$el.show();
                this.tmpView = null;
            }
        },

        // 插入到某个view后面，会临时记住这个view
        insertAfter: function (view) {
            view.$el.after(this.$el.show()).hide();
            this.tmpView = view;
        },

        update: function (e) {
            e.preventDefault();
            this.model.save('name', this.$('[name="categroy[name]"]').val(), {
                wait: true,
                success: this.cancelEdit,
                error: this.showError
            });
        },

        showError: function (model, xhr) {
            var txt = $.parseJSON(xhr.responseText);
            this.$('.tooltip-inner').text(txt[0]);
            this.$('.tooltip').removeClass('out').addClass('in');
            setTimeout(this.hideError, 2000);
        },

        hideError: function () {
            this.$('.tooltip').removeClass('in').addClass('out');
        }
    });

    return CategoryEditView;
});