# -coding: utf-8 -
module CategoriesHelper
  def category_options
    [['选择分类...','']] + Category.all.map{|c| [c.name, c.id]}
  end
end
