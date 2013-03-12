/**
 * 评论列表
 */
define(function (require) {
    var $ = require('$');
    require('jquery-ujs');

//    setTimeout(function () {
//        $('div.alert-success').fadeOut();
//    }, 3000);

    $('a.delete').click(function(){
        //$(this).closest('article').fadeOut('normal');
        $('.pop-confirm').css({
            left: $(this).position().left,
            top:$(this).position().top+$(this).offset().height
        })
        return false;
    });
});