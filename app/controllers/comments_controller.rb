# -coding: utf-8 -
class CommentsController < ApplicationController

  def create
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.all_comments.build(params[:comment])
    @comment.is_admin = is_admin?
    @comment.ip = request.remote_ip

    save_user_to_cookie(@comment) unless is_admin?

    if verify_captcha(@comment) && @comment.save
      redirect_to blog_path(@comment.blog.slug, :anchor=>'comments'), :notice=>'评论发表成功'
    else
      flash[:error] = @comment.errors.full_messages[0]
      redirect_to blog_path(@comment.blog.slug, :anchor=>'comments')
    end
  end

  protected
  def save_user_to_cookie(comment)
    cookies[:comment_nick] = {:value=>comment.nick, :expires=>1.month.from_now}
    cookies[:comment_email] = {:value=>comment.email, :expires=>1.month.from_now}
  end

end
