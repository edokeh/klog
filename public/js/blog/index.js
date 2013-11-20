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
            'blog/confirm': require('./template/confirm.html'),
            'blog/form': require('./template/form.html')
        },
        factories: {
            'Confirm': require('./service/confirm'),
            'Blog': require('./service/blog'),
            'BlogCategory': require('./service/blog-category'),
            'BlogForm': require('./service/blog-form')
        }
    };
});