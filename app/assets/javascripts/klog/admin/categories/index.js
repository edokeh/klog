/**
 * 分类列表
 */
define(function (require) {
    var Category = require('./category');
    var CategoryListView = require('./category-list-view');
    var CategoryNewView = require('./category-new-view');
    require('jquery-ujs');

    var categories = new Category.List(category_json);
    new CategoryListView({
        collection:categories
    });
    new CategoryNewView({
        collection:categories
    });
});
