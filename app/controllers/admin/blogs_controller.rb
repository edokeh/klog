# -coding: utf-8 -
class Admin::BlogsController < Admin::ApplicationController

  def index
    @blogs = Blog.order("created_at DESC").includes(:category).page(params[:page])
  end

  def new
    @blog = Blog.new
  end

  #创建
  def create
    @blog = Blog.new(params[:blog])
    if @blog.save
      redirect_to admin_blogs_path, :notice=>"发表文章成功！"
    else
      render :new
    end
  end

  def edit
    @blog = Blog.find(params[:id])
    @categories = Category.all
  end

  def update
    @blog = Blog.find(params[:id])
    if @blog.update_attributes(params[:blog])
      if @blog.category_id_changed?
        puts @blog.category_was
      end      
      redirect_to admin_blogs_path, :success=>"修改成功！"
    else
      render :edit
    end
  end
end