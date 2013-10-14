define(function (require, exports, module) {
    var IndexController = require('./index-controller');
    var AddController = require('./add-controller');
    var EditController = require('./edit-controller');
    var ValidForm = require('./valid-form');

    module.exports = {
        controllers: {
            'category.index': IndexController,
            'category.add': AddController,
            'category.edit': EditController
        },
        factories: {
            'Category': function (Model) {
                return Model.create('admin/categories');
            },
            'ValidCategoryForm': ValidForm
        }
    };
});