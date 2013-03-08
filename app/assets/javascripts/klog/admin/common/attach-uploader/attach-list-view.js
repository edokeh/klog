/**
 * 附件列表 View
 */
define(function (require) {
    var Backbone = require('backbone');
    var AttachView = require('./attach-view');

    var AttachListView = Backbone.View.extend({
        el: $('.upload-list'),

        initialize: function () {
            _.bindAll(this);
            this.collection.on('add', this.add);
        },

        add: function (attach) {
            var view = new AttachView({model: attach});
            this.$el.append(view.render().el).show();
        }
    });

    return AttachListView;
});