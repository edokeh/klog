# -coding: utf-8 -
# 侧边栏的抽象类，不是AR Model
class Setting::Sidebar
  ATTR_KEYS = [:title, :content, :html_content]
  
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include ActiveModel::MassAssignmentSecurity
  include Singleton

  attr_accessor *ATTR_KEYS
  attr_accessible *ATTR_KEYS

  def update_attributes(attributes={})
    sanitize_for_mass_assignment(attributes).each do |name, value|
      send("#{name}=", value)
    end
    if valid?
      ATTR_KEYS.each do |key|
        Setting['sidebar_' + key.to_s] = self.send(key)
      end
      return true
    else
      return false
    end
  end

  def persisted?
    false
  end

end