/**
 * 分类 Model
 */
define(function (require) {
    var _ = require('_');
    var Backbone = require('backbone');

    Backbone.emulateHTTP = true;

    var Category = Backbone.Model.extend({

    });

    Category.List = Backbone.Collection.extend({
        model: Category,
        url: '/admin/categories'
    });


    return Category;
});