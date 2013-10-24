# -*- encoding : utf-8 -*-
class Admin::BlogsController < Admin::ApplicationController

  def index
    @blogs = Blog.order("created_at DESC").includes(:category).page(params[:page])
    @blogs = @blogs.where(:status => params[:status]) if params[:status]
  end

  def new
    @blog = Blog.new(:status => Blog::S_DRAFT)
  end

  #创建
  def create
    @blog = Blog.new(params[:blog])
    if @blog.save
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @blog)
      respond_to do |format|
        format.html { redirect_to admin_blogs_path(:status => @blog.status), :notice => @blog.draft? ? "文章保存成功！" : "文章发布成功！" }
        format.json { render :json => @blog }
      end
    else
      render :new
    end
  end

  def edit
    @blog = Blog.find(params[:id])
  end

  def show
    @blog = Blog.find(params[:id])
  end

  def update
    @blog = Blog.find(params[:id])
    if @blog.update_attributes(params[:blog])
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @blog)
      respond_to do |format|
        format.html { redirect_to admin_blogs_path(:status => @blog.status), :notice => "“#{@blog.title}” 修改成功！" }
        format.json { render :json => @blog }
      end
    else
      render :edit
    end
  end

  def destroy
    @blog = Blog.find(params[:id])
    @blog.destroy

    respond_to do |format|
      format.html { redirect_to :back, :notice => '删除成功！' }
      format.json { head :no_content }
    end
  end

  #直接发布草稿
  def publish
    @blog = Blog.find(params[:id])
    @blog.publish!

    redirect_to admin_blogs_path(:status => @blog.status), :notice => "“#{@blog.title}” 发布成功！"
  end

end
