/**
 * BLOG 模块
 */
define(function(require, exports, module) {
    module.exports = {
        controllers: {
            'blog.index': require('./controller/index'),
            'blog.new': require('./controller/new'),
            'blog.edit': require('./controller/edit')
        },
        templates: {
            'blog/index': require('./template/index.html'),
            'blog/form': require('./template/form.html')
        },
        factories: {
            'Confirm': require('./service/confirm'),
            'Blog': require('./service/blog'),
            'BlogAttach': require('./service/attach'),
            'BlogCategory': require('./service/blog-category'),
            'BlogForm': require('./service/blog-form')
        },
        directives: {
            'fileSelect': require('./directive/file-select'),
            'fileDrop': require('./directive/file-drop')
        }
    };
});