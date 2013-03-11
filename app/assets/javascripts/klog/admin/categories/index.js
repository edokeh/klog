/**
 * 分类列表
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');

    var successTip = require('../common/success-tip');
    var Category = require('./category');
    var CategoryListView = require('./category-list-view');
    var CategoryNewView = require('./category-new-view');

    require('jquery-ujs');


    var categories = new Category.List(category_json);
    new CategoryListView({
        collection:categories
    });

    new CategoryNewView({
        collection:categories
    });


    $('a.delete').on('ajax:success', function () {
        $(this).closest('tr').hide('fast');
    });
//
//    $('#new_category').on('submit', function (e) {
//        e.preventDefault();
//        categories.create({
//            name: $(this).find('[name="category[name]"]').val()
//        }, {wait:true});
//        //category.on
//        return false;
//    });

    $("a.edit").click(function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var td = $(this).closest('td');
        td.children().hide();
        $("#edit_cate_name").val($(this).siblings('span').text());
        $("#edit_form").attr("action", url).appendTo(td).show();
        $("#edit_cate_name").focus();
    });

    $("#edit_form").on('ajax:success', function (e, errors) {
        if (errors) {
            alert(errors[0]);
        } else {
            $(this).siblings('span').text($("#edit_cate_name").val());
            $('#cancel_edit').click();
        }
    });

    $('#cancel_edit').click(function () {
        var td = $(this).closest('td');
        var form = $(this).closest('form');
        form.appendTo('body').hide();
        td.children().show();
        td.find('a').removeAttr('style');
    });

//    var timer;
//    $('td').hover(function () {
//        clearTimeout(timer);
//        timer = setTimeout(_.bind(function () {
//            $(this).find('.list-btn').fadeIn('fast');
//        }, this), 200);
//    }, function () {
//        $(this).find('.list-btn').hide();
//    });
});
