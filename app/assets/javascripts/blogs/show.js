//= require jquery.color
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
        $('#comment_commentable_id, #comment_commentable_type').val(function() {
            return $(this).data('origin');
        });
        $(this).hide();
    });

    $('#submit_comment').click(function(e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
        }else{
            $(this).addClass('disabled');
        }
    });

    var timer;
    $('#comment_content').focus(
            function() {
                timer = setInterval(checkComment, 500);
            }).blur(function() {
        clearInterval(timer);
    });

    setTimeout(function() {
        $('div.alert-success').fadeOut();
    }, 2000);

    checkComment();

    if (/^#comments_(\d+)$/.test(location.hash)) {
        var header = $(location.hash).find('header');
        var blinkA,blinkB,i=0;
        blinkA = function() {
            if(i++>2){
                return;
            }
            header.animate({backgroundColor: "#fff"}, 'normal', 'linear', blinkB);

        }
        blinkB = function() {
            header.animate({backgroundColor: "#eee"}, 'normal', 'linear', blinkA);
        }
        blinkA();
    }

    //检查评论内容框有没有内容
    //如果有则高亮按钮
    function checkComment() {
        if ($('#comment_content').val().trim().length > 0) {
            $('#submit_comment').addClass('btn-primary').removeClass('disabled');
            $('#submit_comment').find('i').addClass('icon-white');
        } else {
            $('#submit_comment').removeClass('btn-primary').addClass('disabled');
            ;
            $('#submit_comment').find('i').removeClass('icon-white');
        }
    }

});