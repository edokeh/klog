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
            'click .insert': 'insertToContent',
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

        delete:function(){
            if(confirm('确定删除？')){
                this.model.destroy();
                this.remove();
            }
            return false;
        },

        insertToContent: function () {
            var code = this.model.getCode();
            _this.insertCallback(code);
        }
    });

    return AttachView;
});