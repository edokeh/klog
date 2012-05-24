//= require uploader
//= require mustache
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

    var uploader = new Uploader({
        upload_url : "/admin/attaches",
        file_post_name: "file",
        file_size_limit : "5 MB",
        file_types : "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx"
    });

    uploader.on('start', function(file) {
        var template = $("#upload-list-temp").html();
        var json = {'filename':file.name};
        var html = Mustache.to_html(template, json).replace(/^\s*/mg, '');
        $('.upload-list').append($(html)).show();
    });
    uploader.on('progress', function(file, complete, total) {
        var percent = parseInt(complete * 100 / total);
        $('.upload-list div.upload-item:last').find('.bar').width(percent + '%');
    });
    uploader.on('success', function(file, data) {
        var result = $.parseJSON(data);
        var item = $('.upload-list div.upload-item:last');
        if (result.status == 'success') {
            item.data(result.data);
            item.find('.progress').hide();
            item.find('.handle').show();
            item.find('a.delete').prop('href', '/admin/attaches/' + result.data.attach_id);
            item.find('a.view').prop('href', result.data.url);
            item.find('input:hidden').val(result.data.attach_id);
        } else {
            item.remove();
        }
    });

    $(".upload-list").on('click', 'a.insert', function() {
        var data = $(this).closest('.upload-item').data();
        var url = data.url;
        if (data.is_image) {
            var code = '![](' + url + ')';
        } else {
            var code = '[' + data.filename + '](' + url + ')';
        }
        $("#blog_content").val($("#blog_content").val() + code);
    });

    $(".upload-list").on('click', 'a.delete', function() {
        $(this).closest('.upload-item').remove();
        if ($('.upload-item').length === 0) {
            $('.upload-list').hide();
        }
    });
});