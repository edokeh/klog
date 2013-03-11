/**
 * 附件 Model
 */
define(function (require) {
    var _ = require('_');
    var Backbone = require('klog-backbone');

    var Attach = Backbone.Model.extend({
        defaults: {
            percent: 0,
            is_complete: false
        },

        //markdown 的 code
        getCode: function () {
            var url = this.get('url');
            if (this.get('is_image')) {
                var code = '![](' + url + ')';
            } else {
                var code = '[' + this.get('file_name') + '](' + url + ')';
            }
            return code;
        }
    });

    Attach.List = Backbone.Collection.extend({
        model: Attach,
        url: '/admin/attaches'
    });


    return Attach;
});