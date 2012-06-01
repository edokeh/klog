# -coding: utf-8 -
class Admin::BlogsController < Admin::ApplicationController

  def index
    params[:status] ||= Blog::S_PUBLISH
    @blogs = Blog.where(:status=>params[:status]).order("created_at DESC")
                .includes(:category).page(params[:page])
  end

  def new
    @blog = Blog.new
  end

  #创建
  def create
    @blog = Blog.new(params[:blog])
    if @blog.save
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @blog)
      redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"发表文章成功！"
    else
      render :new
    end
  end

  def edit
    @blog = Blog.find(params[:id])
  end

  def update
    @blog = Blog.find(params[:id])
    if @blog.update_attributes(params[:blog])
       # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @blog)
      redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"“#{@blog.title}” 修改成功！"
    else
      render :edit
    end
  end

  def destroy
    @blog = Blog.find(params[:id])
    @blog.destroy

    redirect_to :back, :notice=>'删除成功！'
  end

  #直接发布草稿
  def publish
    @blog = Blog.find(params[:id])
    @blog.publish!

    redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"“#{@blog.title}” 发布成功！"
  end

end