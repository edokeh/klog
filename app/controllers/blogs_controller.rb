class BlogsController < ApplicationController

  def index
    @blogs = Blog.publish.order('created_at DESC').page(params[:page]).per(5)
  end

  def show
    @blog = Blog.where(:slug=>params[:id]).first
    raise ActiveRecord::RecordNotFound if @blog.nil?
    puts is_admin?
    raise ActiveRecord::RecordNotFound if @blog.draft? and !is_admin?
  end

end
