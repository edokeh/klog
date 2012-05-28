# -coding: utf-8 -
class ApplicationController < ActionController::Base
  protect_from_forgery
  
  layout 'public_layout'

  rescue_from ActiveRecord::RecordNotFound, :with=>:redirect_404

  helper_method :is_admin?

  protected
  #跳转至404页面
  def redirect_404
    redirect_to '/404.html'
  end

  def is_admin?
    return session[:admin] == true
  end
end
