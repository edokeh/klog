//预览markdown内容

var Preview = {
    init:function(textarea) {
        this.textarea = textarea;
        $("#preview").height(textarea.height()).width(textarea.width());
        var _this = this;
        $(".nav li").click(function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");

            $('#preview').toggle().html('Loading...');
            _this.textarea.toggle();

            if ($(this).data("type") === 'preview') {
                _this.showPreview();
            } else {
                _this.textarea.focus();
            }
        });
    },

    showPreview:function() {
        var content = this.textarea.val();
        $.post("/admin/preview", {'content':content}, function(html) {
            $('#preview').html(html).show();
        }, 'json');
    }
}