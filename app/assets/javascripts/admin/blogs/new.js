//= require uploader
//= require underscore-min
//= require backbone-min
//= require backbone.memory
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

    var Attach = Backbone.Model.extend({
        defaults:{
            percent:0,
            is_complete:false
        },

        //markdown的code
        getCode:function() {
            var url = this.get('url');
            if (this.get('is_image')) {
                var code = '![](' + url + ')';
            } else {
                var code = '[' + this.get('filename') + '](' + url + ')';
            }
            return code;
        }
    });

    var AttachList = Backbone.Collection.extend({
        model:Attach,
        storage: new Store("attach")
    });

    var AttachView = Backbone.View.extend({
        className:"upload-item",
        template: _.template($('#upload-list-temp').html()),

        events: {
            "click .insert" : "insertToContent"
        },

        initialize: function() {
            this.model.bind('change:percent', this.renderProcess, this);
            this.model.bind('change:is_complete', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        renderProcess:function() {
            var percent = this.model.get('percent');
            this.$('.bar').width(percent + '%');
        },

        insertToContent:function() {
            var code = this.model.getCode();
            $("#blog_content").val($("#blog_content").val() + code);
        }
    });

    var AttachListView = Backbone.View.extend({
        el:$('.upload-list'),

        initialize: function() {
            this.collection.bind('add', this.addOne, this);
        },

        addOne: function(attach) {
            var view = new AttachView({model: attach});
            this.$el.append(view.render().el).show();
        }
    });

    var uploader = new Uploader({
        upload_url : "/admin/attaches",
        file_post_name: "file",
        file_size_limit : "5 MB",
        file_types : "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx"
    });

    var attaches = new AttachList(attaches_json);
    new AttachListView({'collection':attaches});

    uploader.on('start', function(file) {
        attaches.create({'filename':file.name});
        //var view = new AttachView({model: attach});
        //$('.upload-list').append(view.render().el).show();
    });

    uploader.on('progress', function(file, complete, total) {
        var percent = parseInt(complete * 100 / total);
        var attach = attaches.last();
        attach.set({'percent':percent});
    });

    uploader.on('success', function(file, data) {
        var result = $.parseJSON(data);
        var attach = attaches.last();
        if (result.status == 'success') {
            attach.set($.extend(result.attach, {'is_complete':true}));
        } else {
            attach.destroy();
        }
    });

//    uploader.on('start', function(file) {
//        var template = $("#upload-list-temp").html();
//        var json = {'filename':file.name};
//        var html = Mustache.to_html(template, json).replace(/^\s*/mg, '');
//        $('.upload-list').append($(html)).show();
//    });
//    uploader.on('progress', function(file, complete, total) {
//        var percent = parseInt(complete * 100 / total);
//        $('.upload-list div.upload-item:last').find('.bar').width(percent + '%');
//    });
//    uploader.on('success', function(file, data) {
//        var result = $.parseJSON(data);
//        var item = $('.upload-list div.upload-item:last');
//        if (result.status == 'success') {
//            item.data(result.data);
//            item.find('.progress').hide();
//            item.find('.handle').show();
//            item.find('a.delete').prop('href', '/admin/attaches/' + result.data.attach_id);
//            item.find('a.view').prop('href', result.data.url);
//            item.find('input:hidden').val(result.data.attach_id);
//        } else {
//            item.remove();
//        }
//    });
//
//    $(".upload-list").on('click', 'a.insert', function() {
//        var data = $(this).closest('.upload-item').data();
//        var url = data.url;
//        if (data.is_image) {
//            var code = '![](' + url + ')';
//        } else {
//            var code = '[' + data.filename + '](' + url + ')';
//        }
//        $("#blog_content").val($("#blog_content").val() + code);
//    });
//
//    $(".upload-list").on('click', 'a.delete', function() {
//        $(this).closest('.upload-item').remove();
//        if ($('.upload-item').length === 0) {
//            $('.upload-list').hide();
//        }
//    });

});