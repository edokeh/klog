/**
 * 分类
 */
define(function(require, exports, module) {

    module.exports = ['$resource', function($resource) {
        var Category = $resource('/admin/categories/:id.json', {id: '@id'});

        return Category;
    }];
});