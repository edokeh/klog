# -coding: utf-8 -
class Setting < ActiveRecord::Base
  ADMIN_PASSWORD = 'admin_password'

  attr_accessible :key, :value

  #校验管理员用户名密码
  def self.validate_admin(password)
    return self.get_value(ADMIN_PASSWORD) == password
  end

  #网站标题
  def self.website_title
    return self.get_value(WEBSITE_TITLE)
  end

  protected

  def self.get_value(key)
    return self.where(:key=>key).first.value
  end
end
