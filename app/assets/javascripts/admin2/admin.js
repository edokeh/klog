/**
 * @author chaos
 */
define(function (require, exports, modules) {
    var Backbone = require('backbone.marionette');
    var Blog = require('./blogs/index');

    var AdminApp = new Backbone.Marionette.Application();
    AdminApp.addRegions({
        'main': '.main'
    })

    AdminApp.module('blogs', Blog);

    AdminApp.start();
});