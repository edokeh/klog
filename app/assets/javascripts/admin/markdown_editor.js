//= require twitter/bootstrap/modal
//预览markdown内容
//约定：预览结果的div必须id为preview，相应的textarea需要有data-preview=true属性
var MarkdownEditor = {
    init:function() {
        this.textarea = $('textarea[data-preview=true]');
        $("#preview").height(this.textarea.height()).width(this.textarea.width());
        var _this = this;
        $(".nav li[data-type]").click(function() {
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

        $(document).keydown(function(e) {
            if (e.which === 77 || e.which === 229) {  //M键
                $("#markdownTip").modal();
            }
        });

        $("#popMarkdownTip").click(function() {
            $("#markdownTip").modal();
        })
    },

    showPreview:function() {
        var content = this.textarea.val();
        $.post("/admin/preview", {'content':content}, function(html) {
            $('#preview').html(html).show();
        }, 'json');
    }
}

MarkdownEditor.init();