/**
 * 分类 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('klog-backbone');
    var temp = require('./category.html');

    var CategoryView = Backbone.View.extend({
        el: null,
        template: _.template(temp),

        events: {
        },

        initialize: function () {
            _.bindAll(this);

            this.model.on('destroy', this.remove);

            this.render();
        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));
        }
    });

    return CategoryView;
});