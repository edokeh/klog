# -*- encoding : utf-8 -*-
class Admin::CategoriesController < Admin::ApplicationController

  def index
    @categories = Category.all

    @category = Category.new
  end

  def create
    @category = Category.new(params[:category])

    if @category.save
      render :json => @category.to_json
    else
      render :json => @category.errors.full_messages, :status => 422
    end
  end

  def update
    @category = Category.find(params[:id])

    respond_to do |format|
      if @category.update_attributes(params[:category])
        format.html { redirect_to admin_categories_path, :notice => '修改成功！' }
        format.json { render :json => @category.to_json }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @category.errors.full_messages, :status => 422 }
      end
    end
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy

    head :no_content
  end
end
