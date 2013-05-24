# -*- encoding : utf-8 -*-
class Admin::Settings::WebsitesController < Admin::ApplicationController

  def edit
    @website = Setting::Website.instance
  end

  def update
    @website = Setting::Website.instance
    if @website.update_attributes(params[:setting_website])
      redirect_to edit_admin_settings_website_path, :notice=>'修改成功！'
    else
      render :edit
    end
  end

end
