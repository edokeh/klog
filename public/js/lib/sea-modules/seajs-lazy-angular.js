define(function(require) {
    var angular = require('angularjs');

    var cachedInternals = {};  // angular 内部对象
    var lazyModules = {};
    var moduleFn = angular.module;

    var SeajsLazyAngular = {

        // 交给 app 模块的 config 方法，获取内部对象
        cacheInternals: ["$provide", "$compileProvider", "$filterProvider", "$controllerProvider",
            function($provide, $compileProvider, $filterProvider, $controllerProvider) {
                cachedInternals.$provide = $provide;
                cachedInternals.$compileProvider = $compileProvider;
                cachedInternals.$filterProvider = $filterProvider;
                cachedInternals.$controllerProvider = $controllerProvider;
            }
        ],

        // 替换原有的 angular.module 方法，提供 module lazy load
        patchAngular: function() {
            // 暂不支持 config 参数
            angular.module = function(name, requires) {
                var module;
                if (typeof(requires) === "undefined") {
                    if (lazyModules.hasOwnProperty(name)) {
                        module = lazyModules[name];
                    }
                    else {
                        module = moduleFn.call(angular, name);
                    }
                }
                else {
                    module = makeLazyModule(name, requires);
                    lazyModules[name] = module;
                    module.realModule = moduleFn.call(angular, name, requires);
                }
                return module;
            };
        },

        setResolveCallback: function(callback) {
            this.resolveCallback = callback;
        },

        createLazyStub: function(url, resolveCallback) {
            return new LazyStub(url, resolveCallback || this.resolveCallback);
        }
    };

    function LazyStub(url, resolveCallback) {
        this.url = url;
        this.resolveCallback = resolveCallback || angular.noop;
    }

    LazyStub.prototype.createRoute = function(controllerName, options) {
        var moduleUrl = this.url;
        var resolveCallback = this.resolveCallback;

        options = options || {};
        options.controller = controllerName;
        options.resolve = {
            module: ['$q', '$route', '$templateCache', '$exceptionHandler', '$injector', function($q, $route, $templateCache, $exceptionHandler, $injector) {
                var defer = $q.defer();
                var templateDefer = $q.defer();

                if (!$route.current.template && !$route.current.templateUrl) {
                    $route.current.template = function() {
                        return templateDefer.promise;
                    };
                }

                require.async(moduleUrl, function(m) {
                    // execute run block
                    m.resolveRun($injector);

                    // get controller/template
                    var controller = m.retrieveController(controllerName);
                    var template = $templateCache.get(controller.templateUrl);

                    // invoke resolveCallback
                    $injector.invoke(resolveCallback, null, {controller: controller});

                    templateDefer.resolve(template);
                    defer.resolve(m);
                });

                return defer.promise;
            }]
        };

        return options;
    };

    function makeLazyModule(name, requires) {
        var lazyModule = {
            name: name,
            requires: requires,
            realModule: null,
            __runBlocks: [],
            __controllers: {},

            factory: function() {
                cachedInternals.$provide.factory.apply(null, arguments);
                return lazyModule;
            },
            directive: function() {
                cachedInternals.$compileProvider.directive.apply(null, arguments);
                return lazyModule;
            },
            filter: function() {
                cachedInternals.$filterProvider.register.apply(null, arguments);
                return lazyModule;
            },
            controller: function(name, constructor) {
                // 自身维护一个 Constructor 的缓存
                if (angular.isObject(name)) {
                    cachedInternals.$controllerProvider.register.apply(null, arguments);
                    angular.extend(this.__controllers, name);
                }
                else {
                    cachedInternals.$controllerProvider.register.apply(null, arguments);
                    this.__controllers[name] = constructor;
                }
                return lazyModule;
            },
            provider: function() {
                cachedInternals.$provide.provider.apply(null, arguments);
                return lazyModule;
            },
            service: function() {
                cachedInternals.$provide.service.apply(null, arguments);
                return lazyModule;
            },
            constant: function() {
                cachedInternals.$provide.constant.apply(null, arguments);
                return lazyModule;
            },
            run: function(r) {
                this.__runBlocks.push(r);
                return lazyModule;
            },
            //////////////////////////////////
            // 添加的新方法
            /////////////////////////////////
            /**
             * 注册模板，模块注册时会将之写入 $templateCache
             * @param templates {Object} 模板名称与内容的键值对
             */
            template: function(templates) {
                this.run(['$templateCache', function($templateCache) {
                    angular.forEach(templates, function(v, k) {
                        $templateCache.put(k, v);
                    });
                }]);
            },

            /**
             * 获取 Controller 的 Constructor
             * @param name
             */
            retrieveController: function(name) {
                return this.__controllers.hasOwnProperty(name) ? this.__controllers[name] : null;
            },

            /**
             * 运行注册的 run fn，运行完毕后会清空缓存确保不重复执行
             */
            resolveRun: function($injector) {
                angular.forEach(this.__runBlocks, function(block) {
                    $injector.invoke(block);
                });
                // 依赖的模块
                angular.forEach(this.requires, function(name) {
                    angular.module(name).resolveRun($injector);
                });
                this.__runBlocks.length = 0;
            }

            // TODO Implement the rest of the angular.module interface
        };
        return lazyModule;
    }

    return SeajsLazyAngular;
});