# -*- encoding : utf-8 -*-
# 后台密码的抽象类，不是AR Model
class Setting::AdminPass
  include ActiveModel::Conversion
  include ActiveModel::Validations
  include ActiveModel::MassAssignmentSecurity
  include Singleton

  attr_accessor :old_pass, :new_pass, :new_pass_confirmation
  attr_accessible :old_pass, :new_pass, :new_pass_confirmation

  validate :check_old_pass
  validates :new_pass, :length=>{:minimum=>6}, :confirmation => true
  validates :new_pass_confirmation, :presence => true

  def update_attributes(attributes={})
    sanitize_for_mass_assignment(attributes).each do |name, value|
      send("#{name}=", value)
    end
    if valid?
      Setting.admin_pass = new_pass
      return true
    else
      return false
    end
  end

  def persisted?
    false
  end

  #检查旧密码是否正确
  def check_old_pass
    if !Setting.admin_pass? old_pass
      errors.add(:old_pass, "输入错误")
    end
  end
end
