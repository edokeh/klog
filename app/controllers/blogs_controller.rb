# -coding: utf-8 -
class BlogsController < ApplicationController

  def index
    @blogs = Blog.publish.order('created_at DESC').page(params[:page]).per(5)
  end

  def show
    @blog = Blog.where(:slug=>params[:id]).first
    raise ActiveRecord::RecordNotFound if @blog.nil?
    raise ActiveRecord::RecordNotFound if @blog.draft? and !is_admin?

    @prev_blog = Blog.where('id < ?', @blog.id).order('id DESC').first
    @next_blog = Blog.where('id > ?', @blog.id).order('id ASC').first

    @comment = @blog.comments.build()
  end

end
