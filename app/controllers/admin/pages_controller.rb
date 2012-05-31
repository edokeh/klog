# -coding: utf-8 -
class Admin::PagesController < Admin::ApplicationController

  def index
    @pages = Page.order('sid ASC').all
  end

  def new
    @page = Page.new
  end

  def create
    @page = Page.new(params[:page])

    if @page.save
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @page)
      flash[:notice] = "<strong>#{@page.title}</strong> 创建成功！".html_safe
      redirect_to admin_pages_path
    else
      render :new
    end
  end

  def edit
    @page = Page.find(params[:id])
  end

  def update
    @page = Page.find(params[:id])

    if @page.update_attributes(params[:page])
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @page)
      redirect_to admin_pages_path, :notice=>'修改成功！'
    else
      render :action=>"edit"
    end
  end

  def destroy
    @page = Page.find(params[:id])
    @page.destroy

    redirect_to admin_pages_url, :notice=>'删除成功！'
  end

  def up
    @page = Page.find(params[:id])
    @page.up

    redirect_to admin_pages_url
  end

  def down
    @page = Page.find(params[:id])
    @page.down

    redirect_to admin_pages_url
  end
end
