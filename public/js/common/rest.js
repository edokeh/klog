/**
 * 简单的 REST 接口，封装在 Restangular 之上
 * REST.ITEM.get().then();
 * REST.PLAN_SETTING.getList().then();
 */
angular.module('common').provider('REST', function() {
    var URL = {};

    this.setURL = function(url) {
        URL = url;
    };

    // 获取 REST 对象
    this.$get = ['Restangular', function(Restangular) {

        // 针对服务器有分页的列表数据
        var RestPageAngular = Restangular.withConfig(function(config) {
            config.setResponseExtractor(function(data, operation, what, url, response, deferred) {
                if (operation === 'getList' && data.items) {
                    var items = data.items;
                    items.totalPage = data.pages;
                    items.currPage = data.pageNum;
                    return items;
                }
                else {
                    return data;
                }
            });
        });


        function getHelper(url) {
            return {
                newOne: function() {
                    return RestPageAngular.one(url);
                },

                one: function(id) {
                    return RestPageAngular.one(url, id);
                },

                get: function(id, options) {
                    return RestPageAngular.one(url, id).get(options);
                },

                getList: function(options) {
                    return RestPageAngular.all(url).getList(options);
                }
            };
        }


        var REST = {};
        for (var key in URL) {
            if (URL.hasOwnProperty(key)) {
                REST[key] = getHelper(URL[key]);
            }
        }
        return REST;
    }];
});