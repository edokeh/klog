# -coding: utf-8 -
class Admin::CommentsController < Admin::ApplicationController

  def index
    @comments = Comment.order("created_at DESC").includes(:blog).page(params[:page])
  end


  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    redirect_to :back, :notice=>'删除成功！'
  end

end