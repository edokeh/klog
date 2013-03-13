# -coding: utf-8 -
class CommentsController < ApplicationController

  def create
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.all_comments.build(params[:comment])
    @comment.is_admin = is_admin?
    @comment.ip = request.remote_ip

    save_user_to_cookie(@comment) unless is_admin?

    if (is_admin? || verify_captcha(@comment)) && @comment.save
      respond_to do |format|
        format.html { redirect_to blog_path(@comment.blog.slug, :anchor => 'comments'), :notice => '评论发表成功' }
        format.json { render :json => {:success => true} }
      end
    else
      respond_to do |format|
        format.html { redirect_to blog_path(@comment.blog.slug, :anchor => 'comments'), :error => @comment.errors.full_messages[0] }
        format.json { render :json => {:success => false, :errors => @comment.errors.full_messages} }
      end
    end
  end

  def index
    @blog = Blog.find(params[:blog_id])
    render :partial => 'comments/index', :locals => {:comments => @blog.comments, :level => 0}
  end

  protected
  def save_user_to_cookie(comment)
    cookies[:comment_nick] = {:value => comment.nick, :expires => 1.month.from_now}
    cookies[:comment_email] = {:value => comment.email, :expires => 1.month.from_now}
  end

end
