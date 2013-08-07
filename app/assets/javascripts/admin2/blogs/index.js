/**
 * @author chaos
 */
define(function (require, exports, module) {
    var Backbone = require('backbone.marionette');
    var Blog = require('./blog');
    var BlogListView = require('./blog-view');


    module.exports = function (module, app) {
        this.addInitializer(function () {
            var blogs = new Blog.List();
            app.main.show(new BlogListView({
                collection: blogs
            }));
            blogs.fetch();
        });
    };
});