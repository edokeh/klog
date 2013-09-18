category.factory('Category', function (Restangular) {
    var Category = Restangular.all('admin/categories');

    Restangular.extendCollection('admin/categories', function (collection) {
        collection.remove = function (item) {
            item.remove().then(function () {
                collection.splice(_.indexOf(collection, item), 1);
            });
        };

        return collection;
    });

    return Category;
});