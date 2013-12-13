define(function(require, exports, module) {
    var modal = require('./modal');
    var dropdownToggle = require('./dropdown-toggle');

    module.exports = angular.module('ui.bootstrap', [modal.name, dropdownToggle.name]);
});