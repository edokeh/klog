function SeajsRoute(options) {
    var _this = this;
    this.options = options;

    this.route = {
        controller: options.controller,
        resolve: {
            $template: ['$q', '$rootScope', function ($q, $rootScope) {
                return _this.getTemplate($q, $rootScope);
            }],
            delay: ['$q', '$rootScope', function ($q, $rootScope) {
                return _this.delay($q, $rootScope);
            }]
        }
    };
}

SeajsRoute.prototype.getTemplate = function ($q, $rootScope) {
    this.tplDefer = $q.defer();
    if (this.templates) {
        this.tplDefer.resolve(this.templates[this.options.controller]);
        $rootScope.title = this.titles[this.options.controller];
    }
    return this.tplDefer.promise;
};

SeajsRoute.prototype.delay = function ($q, $rootScope) {
    var defer = $q.defer();
    var _this = this;

    if (this.templates) {
        defer.resolve();
    } else {
        seajs.use(this.options.module, function (module) {
            _this.handleModule(module);

            _this.tplDefer.resolve(_this.templates[_this.options.controller]);
            $rootScope.title = _this.titles[_this.options.controller];
            defer.resolve();
        });
    }
    return defer.promise;
};

/**
 * 将 Module 中的 controller/factory 等插入 app
 */
SeajsRoute.prototype.handleModule = function (module) {
    var queue = SeajsRoute.app._invokeQueue;
    var queueLen = queue.length;

    SeajsRoute.app.controller(module.controllers);

    angular.forEach(module.factories, function (factory, name) {
        SeajsRoute.app.factory(name, module.factories[name]);
    });

    this.templates = {};
    this.titles = {};
    angular.forEach(module.controllers, function (controller, name) {
        this.templates[name] = controller.template;
        this.titles[name] = controller.title;
    }, this);

    for (var i = queueLen; i < queue.length; i++) {
        var call = queue[i];
        var provider = SeajsRoute.providers[call[0]];
        if (provider) {
            provider[call[1]].apply(provider, call[2]);
        }
    }
};

/**
 * 设置 app 模块
 */
SeajsRoute.setApp = function (app) {
    this.app = app;
    var _this = this;
    app.config(['$controllerProvider', '$compileProvider', '$provide', function ($controllerProvider, $compileProvider, $provide) {
        _this.providers = {
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $provide: $provide
        };
    }]);
};

/**
 * 创建路由
 */
SeajsRoute.createRoute = function (options) {
    return new SeajsRoute(options).route;
};