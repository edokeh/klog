# -coding: utf-8 -
class Admin::ApplicationController < ApplicationController
  layout 'admin_layout'
  before_filter :check_admin

  protected
  #检查是否为admin
  def check_admin
    if session[:admin] != true
      redirect_to new_admin_session_path
    end
  end
end