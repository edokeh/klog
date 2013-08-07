/**
 * @author chaos
 */
define(function (require, exports, module) {
    var _ = require('_');
    var Backbone = require('backbone');

    var Blog = Backbone.Model.extend({

    });

    Blog.List = Backbone.Collection.extend({
        model: Blog,
        status: 1,
        url: function () {
            return '/admin2/blogs.json?status=' + this.status;
        }
    });


    module.exports = Blog;
});