# -*- encoding : utf-8 -*-
class TagsController < ApplicationController

  def show
    @blogs = Blog.publish.order("created_at DESC").tagged_with(params[:id]).page(params[:page])
    render 'blogs/index'
  end

end
