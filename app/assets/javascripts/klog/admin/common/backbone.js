define(function (require) {
    var _ = require('_');
    var Backbone = require('backbone');

    Backbone.emulateHTTP = true;

    // 应对 CSRF 校验
//    Backbone.sync = _.wrap(Backbone.sync, function (func, method, model, options) {
//        if (method == 'create' || method == 'update' || method == 'delete') {
//            var beforeSend = options.beforeSend;
//            options.beforeSend = function (xhr) {
//                xhr.setRequestHeader('X-CSRF-Token', Backbone.$('meta[name=csrf-token]').attr('content'));
//                if (beforeSend) return beforeSend.apply(this, arguments);
//            };
//        }
//
//        return func.call(this, method, model, options);
//    });

    return Backbone;
});