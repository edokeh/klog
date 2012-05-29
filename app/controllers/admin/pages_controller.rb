# -coding: utf-8 -
class Admin::PagesController < Admin::ApplicationController

  def index
    @pages = Page.all
  end

  def new
    @page = Page.new
  end

  def create
    @page = Page.new(params[:page])

    if @page.save
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
end
