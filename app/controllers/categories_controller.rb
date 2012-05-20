class CategoriesController < ApplicationController

  def show
    @category = Category.where(:name=>params[:id]).first
    @blogs = @category.blogs.order("created_at DESC").all
    render 'blogs/index'
  end

end
