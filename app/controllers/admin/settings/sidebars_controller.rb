# -coding: utf-8 -
class Admin::Settings::SidebarsController < Admin::ApplicationController

  def edit
    @sidebar = Setting::Sidebar.instance
  end

  def update
    @sidebar = Setting::Sidebar.instance
    if @sidebar.update_attributes(params[:setting_sidebar])
      # 更新附件的归属
      Attach.update_parent(params[:attach_ids], @sidebar)
      redirect_to edit_admin_settings_sidebar_path, :notice=>'侧边栏修改成功！'
    else
      render :edit
    end
  end

end