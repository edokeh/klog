module SettingsHelper
  
  def settings_nav_class(name)
    return 'class="active"'.html_safe if controller_name==name
  end
end
