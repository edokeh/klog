/**
 * Blog
 */
define(function(require, exports, module) {

    module.exports = {
        'Blog': ['$resource', function($resource) {
            var Blog = $resource('/admin/blogs/:id.json', {id: '@id'}, {
                create: {method: 'POST'},
                update: {method: 'PUT'}
            });

            Blog.prototype.$save = function() {
                if (this.id) {
                    this.$update.apply(this, arguments);
                }
                else {
                    this.$create.apply(this, arguments);
                }
            };

            Blog.prototype.setPublish = function(flag) {
                this.status = flag ? '1' : '0';
            };

            Blog.STATUS = [
                {value: '1', name: '已发布'},
                {value: '0', name: '草稿箱'},
            ];

            Blog.getStatus = function(value) {
                var s = _.findWhere(Blog.STATUS, {value: value});
                return s || _.first(Blog.STATUS);
            };

            return Blog;
        }]
    };
});