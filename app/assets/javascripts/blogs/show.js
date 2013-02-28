//= require jquery
//= require jquery.color
//= require bootstrap-modal
$(function () {

    $('a.reply-comment').click(function () {
        $('#cancel_reply').show();
        $('#comment_commentable_id').val($(this).data('commentid'));
        $('#comment_commentable_type').val('Comment');
        $('#new_comment').css('margin-left', '20px').insertAfter($(this).parent());
        $('#comment_content').focus();
    });

    $('#cancel_reply').click(function () {
        $('#new_comment').css('margin-left', 0).insertAfter($('#comment_anchor'));
        $('#comment_commentable_id, #comment_commentable_type').val(function () {
            return $(this).data('origin');
        });
        $(this).hide();
    });

    $('#submit_comment').click(function (e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
        } else {
            $(this).addClass('disabled');
        }
    });

    setTimeout(function () {
        $('div.alert-success').fadeOut();
    }, 2000);

    $('#captcha').on('focus blur', function () {
        var position = $(this).position();
        $(this).next().toggle('fast').css({
            left:position.left + 10,
            top:position.top - 40
        });
    });

    //根据锚点高亮闪烁对应的评论
    if (/^#comments_(\d+)$/.test(location.hash)) {
        var header = $(location.hash).find('header');
        var blinkA, blinkB, i = 0;
        blinkA = function () {
            if (i++ > 2) {
                return;
            }
            header.animate({backgroundColor:"#fff"}, 'normal', 'linear', blinkB);

        }
        blinkB = function () {
            header.animate({backgroundColor:"#eee"}, 'normal', 'linear', blinkA);
        }
        blinkA();
    }

    //检查评论内容框有没有内容
    //如果有则高亮按钮
    function checkComment() {
        var isValid = true;
        $('#comment_content, #comment_nick, #comment_email, #captcha').each(function () {
            if ($(this).val().trim().length === 0) {
                isValid = false;
                return false;
            }
        });
        $('#submit_comment').toggleClass('btn-primary', isValid).toggleClass('disabled', !isValid);
        $('#submit_comment').find('i').toggleClass('icon-white', isValid);
    }
    setInterval(checkComment, 500);

});