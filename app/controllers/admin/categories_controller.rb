# -coding: utf-8 -
class Admin::CategoriesController < Admin::ApplicationController

  def index
    @categories = Category.all

    @category = Category.new
  end

  def create
    @category = Category.new(params[:category])

    if @category.save
      flash[:notice] = "<strong>#{@category.name}</strong> 创建成功！".html_safe
      redirect_to admin_categories_path
    else
      flash[:error] = @category.errors.full_messages.join("<br/>")
      redirect_to admin_categories_path
    end
  end

  def update
    @category = Category.find(params[:id])

    respond_to do |format|
      if @category.update_attributes(params[:category])
        format.html { redirect_to admin_categories_path, :notice=>'修改成功！'}
        format.json { head :no_content}
      else
        format.html { render :action=>"edit"}
        format.json { render :json=>@category.errors.full_messages}
      end
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    redirect_to admin_categories_url, :notice=>'删除成功！'
  end
end
