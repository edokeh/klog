/**
 * common 模块
 */
define(function(require, exports, module) {
    var angular = require('angularjs');
    var ajaxSpinner = require('./ajax-spinner');

    var common = angular.module('common', [ajaxSpinner.name]);

    common.factory(require('./factory/flash'));
    common.factory(require('./factory/confirm'));

    common.factory(require('./factory/blog'));
    common.factory(require('./factory/category'));
    common.factory(require('./factory/attach'));

    common.directive(require('./directive/angular-tag-list'));

    common.config(require('./config/http-method-override'));

    return common;
});