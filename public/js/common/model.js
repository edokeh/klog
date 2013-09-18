angular.module('common', ['restangular']).factory('Model', function (Restangular) {
    var Model = {};

    Model.create = function (url, options) {
        var Child = Restangular.all(url);

        Restangular.extendCollection(url, function (collection) {
            collection.remove = function (item) {
                item.remove().then(function () {
                    collection.splice(_.indexOf(collection, item), 1);
                });
            };

            collection.create = function (item) {
                var promise = Child.post(item);

                promise.then(function (data) {
                    collection.push(data);
                });

                return promise;
            };

            return collection;
        });

        return Child;
    };

    return Model;
});