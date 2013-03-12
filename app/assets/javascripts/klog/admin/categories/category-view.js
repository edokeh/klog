/**
 * 分类 View
 */
define(function (require) {
    var _ = require('_');
    var $ = require('$');
    var Backbone = require('backbone');
    var temp = require('./category.html');
    var PopConfirm = require('../common/pop-confirm');
    require('../common/jquery.color');

    var popConfirm = new PopConfirm();

    var CategoryView = Backbone.View.extend({
        el: null,
        template: _.template(temp),

        events: {
            'click .delete': 'confirmDelete',
            'click .edit': 'edit'
        },

        initialize: function () {
            _.bindAll(this);

            this.model.on('change:name', this.changeName);

            this.render();
        },

        render: function () {
            this.$el = $(this.template(this.model.toJSON()));
        },

        changeName: function (model, name) {
            this.$('td:first').text(name);
            this.animChange();
        },

        confirmDelete: function () {
            popConfirm.show({
                text: '确定要删除分类 “' + this.model.get('name') + '” ？',
                trigger: this.$('.delete')
            });
            popConfirm.off().on('submit', this.delete);
        },

        delete: function () {
            this.model.destroy();
            this.animDelete();
        },

        // 触发修改模式
        edit: function () {
            this.model.trigger('edit', this.model);
        },

        // 删除的动画
        animDelete: function () {
            this.$('td').css('background-color', '#f4c8c5');
            this.$('td').animate({
                backgroundColor: "#fff",
                height: 0
            }, 'slow', 'linear', this.remove);
            this.$el.hide('slow')
        },

        // 修改的动画
        animChange: function () {
            var colorAnim = function () {
                this.$('td').animate({'backgroundColor': '#fff'}, 'slow', 'linear');
            };
            this.$('td').css('backgroundColor', '#fcf8e3');
            _.delay(_.bind(colorAnim, this), 1500);
        }
    });

    return CategoryView;
});