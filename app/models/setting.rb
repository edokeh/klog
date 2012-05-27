# -coding: utf-8 -
require 'active_support'
class Setting < ActiveRecord::Base
  attr_accessible :key, :value

  #设置管理员密码
  def self.admin_pass=(password)
    self[:admin_pass_salt] = SecureRandom.hex(10)
    self[:admin_pass] = Digest::SHA1.hexdigest(self.admin_pass_salt + password)
  end

  #校验密码是否正确
  def self.admin_pass?(password)
    return Digest::SHA1.hexdigest(self.admin_pass_salt + password) == self.admin_pass
  end

  #如果此表中有一条记录的key字段为test
  #则自动添加Setting.test和Setting.test=两个读写方法
  def self.method_missing(method, *args)
    method_name = method.to_s
    super(method, *args)
  rescue NoMethodError
    #setter
    if method_name =~ /=$/
      key = method_name.gsub('=', '')
      value = args.first
      self[key] = value
    #getter
    else
      return self[method_name]
    end
  end

  #根据key获取值
  def self.[](key)
    return self.where(:key=>key).first.try(:value)
  end

  #设置值
  def self.[]=(key, value)
    setting = self.where(:key=>key).first
    if setting.nil?
      Setting.create(:key=>key, :value=>value)
    else
      setting.update_attribute(:value, value)
    end
  end
end
