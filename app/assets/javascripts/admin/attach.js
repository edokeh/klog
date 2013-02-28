//= require uploader
//= require underscore-min
//= require backbone-min
var AttachUploader = {
    init: function(options) {
        options = options || {};
        var _this = this;
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
                    var code = '[' + this.get('file_name') + '](' + url + ')';
                }
                return code;
            }
        });

        var AttachView = Backbone.View.extend({
            className:"upload-item clearfix",
            template: _.template($('#upload-list-temp').html()),

            events: {
                'click .insert' : 'insertToContent'
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
                _this.insertCallback(code);
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

        var AttachList = Backbone.Collection.extend({model:Attach});
        var attaches = new AttachList();
        new AttachListView({'collection':attaches});

        attaches_json.forEach(function(a) {
            attaches.add(a);
        });

        var uploader = new Uploader({
            upload_url : "/admin/attaches",
            file_post_name: "attach[file]",
            file_size_limit : "5 MB",
            file_types : "*.jpg;*.gif;*.png;*.rar;*.ppt;*.pptx",

            post_params: options['post_params'] || {}
        });

        uploader.on('start', function(file) {
            attaches.add({'file_name':file.name});
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
                attach.set(result.attach);
            } else {
                attach.destroy();
            }
        });

        $(document).on('click', 'a.delete', function(e) {
            $(this).closest('.upload-item').remove();
            if ($('.upload-item').length === 0) {
                $('.upload-list').hide('fast');
            }
        });
    },

    onInsert:function(callback) {
        this.insertCallback = callback;
    }
}