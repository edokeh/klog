class BlogsController < ApplicationController

  def index
    @blogs = Blog.order('created_at desc').page(params[:page]).per(1)
  end

  def show
    @blog = Blog.where(:slug=>params[:id]).first
  end

end
