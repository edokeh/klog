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
    @attaches = Attach.where(:id=>params[:attach_ids])
    if @blog.save
      # 更新附件的归属
      @attaches.update_all(:parent_id=>@blog.id, :parent_type=>'Blog')
      redirect_to admin_blogs_path(:status=>@blog.status), :notice=>"发表文章成功！"
    else
      render :new
    end
  end

  def edit
    @blog = Blog.find(params[:id])
    @attaches = @blog.attaches
  end

  def update
    @blog = Blog.find(params[:id])
    @attaches = Attach.where(:id=>params[:attach_ids])
    if @blog.update_attributes(params[:blog])
      # 更新附件的归属
      @attaches.update_all(:parent_id=>@blog.id, :parent_type=>'Blog')
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