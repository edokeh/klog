# -coding: utf-8 -
# 网站信息的抽象类，不是AR Model
class Setting::Website
  ATTR_KEYS = [:title, :sub_title, :description, :author]
  
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include ActiveModel::MassAssignmentSecurity
  include Singleton

  send :attr_accessor, *ATTR_KEYS
  send :attr_accessible, *ATTR_KEYS

  validates :title, :presence=>true

  def initialize
    ATTR_KEYS.each do |key|
      key = key.to_s
      self.send(key + '=', Setting['website_' + key])
    end
  end

  def update_attributes(attributes={})
    sanitize_for_mass_assignment(attributes).each do |name, value|
      send("#{name}=", value)
    end
    if valid?
      ATTR_KEYS.each do |key|
        Setting['website_' + key.to_s] = self.send(key)
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