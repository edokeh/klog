$(function() {
    $("button[data-status]").click(function(e) {
        $("#blog_status").val($(this).data('status'));
    });

    $("#preview").height($("#blog_content").height());
    $("#preview").width($("#blog_content").width());

    $(".nav li").click(function() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        $('#preview').html('Loading...');
        $('#preview,#blog_content').toggle();
        if ($(this).data("type") === 'preview') {
            var content = $("#blog_content").val();
            $.post("/admin/blogs/preview", {'content':content}, function(html) {
                $('#preview').html(html).show();
                $('#blog_content').hide();
            }, 'json');
        } else {
            $('#blog_content').focus();
        }
    });
});