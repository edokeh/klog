angular.module('common').config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $filterProvider, $provide) {
    var register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service,
        decorator: $provide.decorator
    };


    $provide.provider('SeajsModule', SeajsModuleProvider);

    function SeajsModuleProvider() {
        this.$get = ['$rootScope', function($rootScope) {
            return new SeajsModule($rootScope, register);
        }];

        // 快捷方法，用于创建一个 module 的配置
        this.create = function(moduleUrl) {
            return {
                routeFor: function(controllerName) {
                    return {
                        moduleUrl: moduleUrl,
                        controller: controllerName
                    };
                }
            };
        };

        this.setTilteSuffix = function(suffix) {
            SeajsModule.titleSuffix = suffix;
        };
    }

    function SeajsModule($rootScope, register) {
        this.$rootScope = $rootScope;
        this.register = register;
        this.modules = {};
    }

    SeajsModule.prototype = {
        constructor: SeajsModule,

        // 初始化
        init: function($templateCache) {
            var _this = this;
            this.$templateCache = $templateCache;
            this.$rootScope.$on('$routeChangeStart', function(e, target) {
                var route = target && target.$$route;
                if (route) {
                    route.resolve = route.resolve || {};
                    _this.handleRouteChange(route);
                }
            });
        },

        // 处理 URL 变化，为现有的 route 对象增加 resolve
        handleRouteChange: function(route) {
            var _this = this;
            var module = this.modules[route.moduleUrl];
            // 如已有缓存
            if (module) {
                route.resolve.module = function() {
                    return module;
                };
                route.resolve.$template = function() {
                    var templateName = module.controllers[route.controller].template;
                    return _this.$templateCache.get(templateName);
                };
                this.resolveModule(module, route.controller);
            }
            // 异步加载
            else {

                route.resolve.module = ['$q', function($q) {
                    var defer = $q.defer();
                    seajs.use(route.moduleUrl, function(m) {
                        _this.registerModule(route, m);
                        if (_this.tplDefer.tag === route.moduleUrl + route.controller) {
                            var templateName = m.controllers[route.controller].template;
                            _this.tplDefer.resolve(_this.$templateCache.get(templateName));
                            _this.resolveModule(m, route.controller);
                            defer.resolve(m);
                        }
                    });
                    return defer.promise;
                }];
                route.resolve.$template = ['$q', function($q) {
                    _this.tplDefer = $q.defer();
                    _this.tplDefer.tag = route.moduleUrl + route.controller;
                    return _this.tplDefer.promise;
                }];
            }
        },

        // 注册 module，缓存、并将 controller/service 等注册
        registerModule: function(route, module) {
            this.modules[route.moduleUrl] = module;

            this.register.controller(module.controllers || {});
            this.register.factory(module.factories || {});

            for (var key in module.templates) {
                if (module.templates.hasOwnProperty(key)) {
                    this.$templateCache.put(key, module.templates[key]);
                }
            }
        },

        resolveModule: function(module, controller) {
            this.$rootScope.title = module.controllers[controller].title + (SeajsModule.titleSuffix || '');
        }
    };
}]);

angular.module('common').run(['$templateCache', function($templateCache) {
    $templateCache.put('');
}]);