/**
 * 分类 Model
 */
define("klog/admin/categories/category-debug", [ "_-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var Backbone = require("backbone-debug");
    Backbone.emulateHTTP = true;
    var Category = Backbone.Model.extend({});
    Category.List = Backbone.Collection.extend({
        model: Category,
        url: "/admin/categories"
    });
    return Category;
});

/**
 * 分类列表 View
 */
define("klog/admin/categories/category-list-view-debug", [ "./category-view-debug", "../common/pop-confirm-debug", "./category-edit-view-debug", "_-debug", "$-debug", "jquery.color-debug", "backbone-debug", "events-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    require("jquery.color-debug");
    var Backbone = require("backbone-debug");
    var CategoryView = require("./category-view-debug");
    var CategoryEditView = require("./category-edit-view-debug");
    var CategoryListView = Backbone.View.extend({
        el: $("table"),
        initialize: function() {
            _.bindAll(this);
            this.childViews = {};
            this.editView = new CategoryEditView();
            this.emptyRow = this.$(".table-empty-row");
            this.collection.on("add", this.add);
            this.collection.on("destroy", this.handleChildDelete);
            this.collection.on("edit", this.renderEdit);
            this.collection.each(function(category) {
                this.add(category, {
                    noAnim: true
                });
            }, this);
            if (this.collection.size() === 0) {
                this.emptyRow.show();
            }
        },
        add: function(category, options) {
            var view = new CategoryView({
                model: category
            });
            this.$el.append(view.$el);
            this.childViews[category.id] = view;
            this.emptyRow.hide();
            if (!options || !options.noAnim) {
                view.$el.fadeIn("normal", view.animChange);
            }
        },
        renderEdit: function(category) {
            var view = this.childViews[category.id];
            this.editView.setModel(category);
            this.editView.insertAfter(view);
        },
        // 处理子元素被删除
        handleChildDelete: function(category) {
            delete this.childViews[category.id];
        }
    });
    return CategoryListView;
});

/**
 * 分类 View
 */
define("klog/admin/categories/category-view-debug", [ "../common/pop-confirm-debug", "_-debug", "$-debug", "jquery.color-debug", "backbone-debug", "events-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    require("jquery.color-debug");
    var Backbone = require("backbone-debug");
    var temp = '<tr><td><%= name %></td><td><%= blog_count %></td><td><%= created_at %></td><td class="btn-group"><a class="btn edit">修改</a><a class="btn delete">删除</a></td></tr>';
    var PopConfirm = require("../common/pop-confirm-debug");
    var popConfirm = new PopConfirm();
    var CategoryView = Backbone.View.extend({
        el: null,
        template: _.template(temp),
        events: {
            "click .delete": "confirmDelete",
            "click .edit": "edit"
        },
        initialize: function() {
            _.bindAll(this);
            this.model.on("change:name", this.changeName);
            this.render();
        },
        render: function() {
            this.$el = $(this.template(this.model.toJSON()));
        },
        changeName: function(model, name) {
            this.$("td:first").text(name);
            this.animChange();
        },
        confirmDelete: function() {
            popConfirm.show({
                text: "确定要删除分类 “" + this.model.get("name") + "” ？",
                trigger: this.$(".delete").parent()
            });
            popConfirm.off().on("submit", this.delete);
        },
        "delete": function() {
            this.model.destroy();
            this.animDelete();
        },
        // 触发修改模式
        edit: function() {
            this.model.trigger("edit", this.model);
        },
        // 删除的动画
        animDelete: function() {
            this.$("td").css("background-color", "#f4c8c5");
            this.$("td").animate({
                backgroundColor: "#fff",
                height: 0
            }, "slow", "linear", this.remove);
            this.$el.hide("slow");
        },
        // 修改的动画
        animChange: function() {
            var colorAnim = function() {
                this.$("td").animate({
                    backgroundColor: "#fff"
                }, "slow", "linear");
            };
            this.$("td").css("backgroundColor", "#fcf8e3");
            _.delay(_.bind(colorAnim, this), 1500);
        }
    });
    return CategoryView;
});

/**
 * 弹出式的确认框
 */
define("klog/admin/common/pop-confirm-debug", [ "_-debug", "$-debug", "events-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Events = require("events-debug");
    var html = '<div class="pop-confirm"><div class="pop-confirm-inner clearfix"><div class="pop-confirm-content"></div><div class="pull-right"><a class="btn btn-small btn-primary submit">确定</a>&nbsp;<a class="btn btn-small cancel">取消</a></div></div></div>';
    var PopConfirm = function() {
        _.bindAll(this);
        this.$el = $(html).appendTo("body");
        this.$el.find(".cancel, .submit").click(this.hide);
        this.$el.find(".submit").click(this.triggerSubmit);
        Events.mixTo(this);
    };
    PopConfirm.prototype = {
        constructor: PopConfirm,
        // 显示，传入参数为 {text,trigger}
        show: function(options) {
            if (this.$el.is(":animated")) {
                return;
            }
            this.$el.find(".pop-confirm-content").text(options.text);
            this.$trigger = $(options.trigger);
            var height = this.$el.height();
            var triggerPos = this.$trigger.position();
            var triggerHeight = this.$trigger.outerHeight();
            this.$el.css({
                left: triggerPos.left - this.$el.width() * .4 + "px",
                top: triggerPos.top + "px",
                visibility: "visible",
                height: 0
            });
            this.$el.animate({
                height: height,
                top: "-=" + height + "px"
            }, "fast");
        },
        hide: function() {
            var height = this.$el.height();
            this.$el.animate({
                height: 0,
                top: "+=" + height + "px"
            }, "fast", function() {
                $(this).css({
                    visibility: "hidden",
                    height: "auto"
                });
            });
            this.isShown = false;
        },
        triggerSubmit: function() {
            this.trigger("submit", this.$trigger);
        }
    };
    return PopConfirm;
});

/**
 * 分类 View
 */
define("klog/admin/categories/category-edit-view-debug", [ "_-debug", "$-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var CategoryEditView = Backbone.View.extend({
        el: "#categoryEditView",
        events: {
            "click .cancel-edit": "cancelEdit",
            "submit form": "update"
        },
        initialize: function() {
            _.bindAll(this);
        },
        setModel: function(model) {
            this.cancelEdit();
            this.model = model;
            this.render();
        },
        render: function() {
            this.$('[name="categroy[name]"]').val(this.model.get("name"));
        },
        cancelEdit: function() {
            if (this.tmpView) {
                this.$el.hide();
                this.tmpView.$el.show();
                this.tmpView = null;
            }
        },
        // 插入到某个view后面，会临时记住这个view
        insertAfter: function(view) {
            view.$el.after(this.$el.show()).hide();
            this.tmpView = view;
        },
        update: function(e) {
            e.preventDefault();
            this.model.save("name", this.$('[name="categroy[name]"]').val(), {
                wait: true,
                success: this.cancelEdit,
                error: this.showError
            });
        },
        showError: function(model, xhr) {
            var txt = $.parseJSON(xhr.responseText);
            this.$(".tooltip-inner").text(txt[0]);
            this.$(".tooltip").removeClass("out").addClass("in");
            setTimeout(this.hideError, 2e3);
        },
        hideError: function() {
            this.$(".tooltip").removeClass("in").addClass("out");
        }
    });
    return CategoryEditView;
});

/**
 * 新建分类 View
 */
define("klog/admin/categories/category-new-view-debug", [ "_-debug", "$-debug", "backbone-debug" ], function(require) {
    var _ = require("_-debug");
    var $ = require("$-debug");
    var Backbone = require("backbone-debug");
    var CategoryNewView = Backbone.View.extend({
        el: $("#new_category"),
        events: {
            submit: "createCategory"
        },
        initialize: function() {
            _.bindAll(this);
        },
        // 添加
        createCategory: function(e) {
            e.preventDefault();
            this.collection.create({
                name: this.$('[name="category[name]"]').val()
            }, {
                wait: true,
                success: this.showSuccess,
                error: this.showError
            });
        },
        showSuccess: function(model, resp, options) {
            this.el.reset();
        },
        showError: function(model, xhr, options) {
            var txt = $.parseJSON(xhr.responseText);
            this.$(".tooltip-inner").text(txt[0]);
            this.$(".tooltip").removeClass("out").addClass("in");
            setTimeout(this.hideError, 2e3);
        },
        hideError: function() {
            this.$(".tooltip").removeClass("in").addClass("out");
        }
    });
    return CategoryNewView;
});

/**
 * 分类列表
 */
define("klog/admin/categories/index-debug", [ "./category-debug", "./category-list-view-debug", "./category-view-debug", "../common/pop-confirm-debug", "./category-edit-view-debug", "./category-new-view-debug", "_-debug", "backbone-debug", "$-debug", "jquery.color-debug", "events-debug", "jquery-ujs-debug" ], function(require) {
    var Category = require("./category-debug");
    var CategoryListView = require("./category-list-view-debug");
    var CategoryNewView = require("./category-new-view-debug");
    require("jquery-ujs-debug");
    var categories = new Category.List(category_json);
    new CategoryListView({
        collection: categories
    });
    new CategoryNewView({
        collection: categories
    });
});