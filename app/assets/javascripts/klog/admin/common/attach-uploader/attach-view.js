/**
 * 附件 View
 */
define(function (require) {
    var _ = require('_');
    var Backbone = require('klog-backbone');
    var temp = require('./attach.html');

    var AttachView = Backbone.View.extend({
        className: 'upload-item clearfix',
        template: _.template(temp),

        events: {
            'click .insert': 'insertCode',
            'click .delete': 'delete'
        },

        initialize: function () {
            _.bindAll(this);

            this.model.bind('change:percent', this.renderProcess, this);
            this.model.bind('change:is_complete', this.render, this);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        // 渲染进度
        renderProcess: function () {
            var percent = this.model.get('percent');
            this.$('.bar').width(percent + '%');
        },

        delete: function () {
            if (confirm('确定删除？')) {
                this.model.destroy();
                this.$el.hide('fast', this.remove);
            }
            return false;
        },

        // 点击插入
        insertCode: function () {
            var code = this.model.getCode();
            this.trigger('insertCode', code);
        }
    });

    return AttachView;
});