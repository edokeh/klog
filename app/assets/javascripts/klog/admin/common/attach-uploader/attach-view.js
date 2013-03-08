/**
 * 附件 View
 */
define(function (require) {
    var Backbone = require('backbone');

    var AttachView = Backbone.View.extend({
        className: "upload-item clearfix",
        template: _.template($('#upload-list-temp').html()),

        events: {
            'click .insert': 'insertToContent'
        },

        initialize: function () {
            this.model.bind('change:percent', this.renderProcess, this);
            this.model.bind('change:is_complete', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        renderProcess: function () {
            var percent = this.model.get('percent');
            this.$('.bar').width(percent + '%');
        },

        insertToContent: function () {
            var code = this.model.getCode();
            _this.insertCallback(code);
        }
    });

    return AttachView;
});