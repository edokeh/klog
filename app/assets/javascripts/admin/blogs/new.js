$(function() {
    $("button[data-status]").click(function(e) {
        //e.preventDefault();
        $("#blog_status").val($(this).data('status'));
        //$(this).closest('form').submit();
    });
});