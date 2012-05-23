/**
 * iframe无刷新上传组件
 */
/**
 * @param options 包含以下值
 *                url  上传url
 *                post_name  文件框的name属性
 *                post_params 其余需要一起post的参数，json格式
 */
function Uploader(options) {
    this.url = options.url;
    this.post_name = options.post_name;
    this.post_params = options.post_params;

}

Uploader.prototype = {
    constructor:Uploader,
    counter :0,

    init:function() {
        this.iframe = $('<iframe src="javascript:false;" name="iframe-transport-' + (this.counter++) + '"></iframe>');
        this.form = $('<form style="display:none"></form>').prop({
            'action':this.url,
            'target': this.iframe.prop('name'),
            'method':'POST',
            'enctype': 'multipart/form-data'
        });
        this.fileField = $('<input type="file" />').prop('name', this.post_name);
        

        if (this.post_params) {
            for (var key in this.post_params) {
                $('<input type="hidden" />').prop('name', key).val(this.post_params[key]).appendTo(this.form);
            }
        }

        this.form.append(this.fileField);
        $('body').append(this.iframe).append(this.form);

        this.bindEvent();
    },

    bindEvent:function() {
        this.fileField.change(function() {
            this.form.submit();
        });

        this.iframe.on('load', $.proxy(function() {
            var response = this.iframe.contents();
            var json = $.parseJSON($(response[0].body).text());
            alert(json);
            //this.iframe.remove();
            //this.form.remove();
        }, this));
    },

    //触发选择文件，选完后会上传
    selectAndUpload:function() {
        this.init();
        this.fileField.click();
    }
}
