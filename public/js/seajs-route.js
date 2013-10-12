function SeajsRoute(options) {
    this.route = {
        controller: options.controller,
        resolve: {
            $template: this.getTemplate,
            delay: function () {

            }
        }
    };
}

SeajsRoute.prototype.getTemplate = ['$q', function ($q) {
    tplDefer = $q.defer();
    if (cachedTemplate) {
        tplDefer.resolve(cachedTemplate);
    }
    return tplDefer.promise;
}];

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

SeajsRoute.create = function (options) {
    var seajsRoute = new SeajsRoute(options);
    return seajsRoute.route;

    var tplDefer;
    var cachedTemplate;
    var _this = this;

    var route = {
        controller: options.controller,
        resolve: {
            delay: function ($q) {
                var defer = $q.defer();

                if (cachedTemplate) {
                    defer.resolve();
                } else {
                    seajs.use(options.module, function (module) {
                        cachedTemplate = module.templates[options.template];
                        tplDefer.resolve(cachedTemplate);

                        var queueLen = _this.app._invokeQueue.length;

                        _this.app.controller(options.controller, module.controllers[options.controller]);
                        _this.app.factory('Blog', module.factories.Blog);

                        var queue = _this.app._invokeQueue;
                        for (var i = queueLen; i < queue.length; i++) {
                            var call = queue[i];
                            var provider = _this.providers[call[0]];
                            if (provider) {
                                provider[call[1]].apply(provider, call[2]);
                            }
                        }

                        defer.resolve();
                    });
                }


                return defer.promise;
            }
        }
    };
};