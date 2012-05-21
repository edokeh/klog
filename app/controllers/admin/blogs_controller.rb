# -coding: utf-8 -
class Admin::BlogsController < Admin::ApplicationController

  def index
    params[:status] ||= Blog::S_PUBLISH
    @blogs = Blog.where(:status=>params[:status]).order("created_at DESC").includes(:category).page(params[:page])
  end

  def new
    @blog = Blog.new
  end

  #创建
  def create
    @blog = Blog.new(params[:blog])
    if @blog.save
      redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"发表文章成功！"
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
      redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"“#{@blog.title}” 修改成功！"
    else
      render :edit
    end
  end
end