# -coding: utf-8 -
class Admin::Settings::SidebarsController < Admin::ApplicationController

  def edit
    @sidebar = Setting::Sidebar.instance
  end

  def update
    @sidebar = Setting::Sidebar.instance
    if @sidebar.update_attributes(params[:setting_sidebar])
      redirect_to edit_admin_settings_sidebar_path, :notice=>'侧边栏修改成功！'
    else
      render :edit
    end
  end

end

class Object
  def self.inherited(child)
    target_class = "Child"
    raise "#{target_class} defined" if child.name == target_class
  end
end