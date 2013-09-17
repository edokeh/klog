blog.factory('Blog', function (Restangular) {
    var Blog = Restangular.all('admin/blogs');

    Restangular.extendCollection('admin/blogs', function (collection) {
        collection.remove = function (item) {
            item.remove().then(function () {
                collection.splice(_.indexOf(collection, item), 1);
            });
        };

        return collection;
    });

    return Blog;
});