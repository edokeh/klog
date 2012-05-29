# -coding: utf-8 -
class CommentsController < ApplicationController

  def create
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.all_comments.build(params[:comment])
    @comment.is_admin =  is_admin?
    @comment.ip = request.remote_ip
    if @comment.save
      redirect_to blog_path(@comment.blog.slug, :anchor=>'comments'), :notice=>'评论发表成功'
    else
      
    end
  end

end
