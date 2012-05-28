$(function() {
    $('a.reply-comment').click(function() {
        $('#cancel_reply').show();
        $('#comment_commentable_id').val($(this).data('commentid'));
        $('#comment_commentable_type').val('Comment');
        $('#new_comment').css('margin-left', '20px').insertAfter($(this).parent());
        $('#comment_content').focus();
    });

    $('#cancel_reply').click(function() {
        $('#new_comment').css('margin-left', 0).insertAfter($('#comment_anchor'));
        $(this).hide();
    });

    setTimeout(function() {
        $('div.alert-success').fadeOut();
    }, 2000);

});