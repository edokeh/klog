/**
 * @author chaos
 */
define(function (require, exports, module) {
    var _ = require('_');
    var Backbone = require('backbone');
    var blogTpl = require('./blog.handlebars');
    var blogEmptyTpl = require('./blog-empty.handlebars');
    var blogListTpl = require('./blog-list.handlebars');

    var BlogItemView = Backbone.Marionette.ItemView.extend({
        template: blogTpl,
        tagName: 'tr'
    });

    var BlogEmptyView = Backbone.Marionette.ItemView.extend({
        template: blogEmptyTpl,
        tagName: 'tr'
    });

    var BlogListView = Backbone.Marionette.CompositeView.extend({
        template: blogListTpl,
        itemView: BlogItemView,
        itemViewContainer: 'table',
        emptyView: BlogEmptyView,

        events: {
            'click li': 'changeTab'
        },

        changeTab: function () {
            this.collection.status = 0;
            this.collection.fetch();
        }
    });

    module.exports = BlogListView;
});