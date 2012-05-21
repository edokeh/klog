class BlogsController < ApplicationController

  def index
    @blogs = Blog.publish.order('created_at DESC').page(params[:page]).per(5)
  end

  def show
    @blog = Blog.where(:slug=>params[:id]).first
  end

end
