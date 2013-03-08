/**
 * 附件 Collection
 */
define(function (require) {
    var Backbone = require('backbone');
    var Attach = require('./attach');

    var AttachList = Backbone.Collection.extend({
        model: Attach
    });

    return AttachList;
});