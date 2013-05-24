# -*- encoding : utf-8 -*-
# 侧边栏的抽象类，不是AR Model
class Setting::Sidebar
  ATTR_KEYS = [:title, :content, :html_content]
  
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include ActiveModel::MassAssignmentSecurity
  include Singleton

  attr_accessor *ATTR_KEYS
  attr_accessible *ATTR_KEYS

  validates :html_content, :length=>{:maximum=>2000}

  def initialize
    ATTR_KEYS.each do |key|
      key = key.to_s
      self.send(key + '=', Setting['sidebar_' + key])
    end
  end

  def update_attributes(attributes={})
    sanitize_for_mass_assignment(attributes).each do |name, value|
      send("#{name}=", value)
    end
    self.fill_html_content
    if valid?
      ATTR_KEYS.each do |key|
        Setting['sidebar_' + key.to_s] = self.send(key)
      end
      return true
    else
      return false
    end
  end

  #将markup的content转换为html并写入字段
  def fill_html_content
    self.html_content = Klog::Markdown.render(self.content)
  end

  def persisted?
    false
  end

  def id
    nil
  end

  def attaches
    Attach.where(:parent_type=>self.class.to_s)
  end

end
