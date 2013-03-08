/**
 * 附件 Model
 */
define(function (require) {
    var Backbone = require('backbone');

    var Attach = Backbone.Model.extend({
        defaults: {
            percent: 0,
            isComplete: false
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

    return Attach;
});