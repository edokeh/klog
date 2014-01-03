define(function(require, exports, module) {
    var modal = require('./modal');
    var dropdownToggle = require('./dropdown-toggle');
    var tooltip = require('./tooltip');
    var popover = require('./popover');


    module.exports = angular.module('ui.bootstrap', [modal.name, dropdownToggle.name, tooltip.name, popover.name]);
});