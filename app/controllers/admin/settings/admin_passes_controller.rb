# -*- encoding : utf-8 -*-
class Admin::Settings::AdminPassesController < Admin::ApplicationController

  def edit
    @admin_pass = Setting::AdminPass.instance
  end

  def update
    @admin_pass = Setting::AdminPass.instance
    if @admin_pass.update_attributes(params[:setting_admin_pass])
      redirect_to edit_admin_settings_admin_pass_path, :notice=>'密码修改成功！'
    else
      render :edit
    end
  end

end
