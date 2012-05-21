$(function() {
    $("a[data-id]").click(function(e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var cell = $('td[data-id="' + $(this).data("id") + '"]');
        $("#edit_cate_name").val(cell.text().trim());
        cell.data('original-html', cell.html()).empty();
        $("#edit_form").attr("action", url).appendTo(cell).show();
        $("#edit_cate_name").focus();
        $(this).hide();
    });

    $("#edit_form").submit(function(e) {
        e.preventDefault();
        var td = $(this).closest('td');
        $.post($(this).attr("action"), $(this).serialize(), function(errors) {
            if (errors) {
                
            } else {
                
            }
        }, 'json');
    });

    $('#cancel_edit').click(function() {
        var td = $(this).closest('td');
        var form = $(this).closest('form');
        form.appendTo('body').hide();
        td.html(td.data('original-html'));
        $('a[data-id="' + td.data('id') + '"]').show();
    });
});