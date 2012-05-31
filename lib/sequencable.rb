# 可排序的model
# 默认排序字段为sid，数值越小，越前
module Sequencable
  DEFAULT_FIELD = :sid

  def self.included(clazz)
    clazz.extend Sequencable::ClassMethod
    clazz.instance_variable_set(:@seq_field, DEFAULT_FIELD)
  end

  #向上
  def up
    above_record = self.class.where("#{self.class.sequence_field} < ?", self.sequence_id).order('sid ASC').last
    return if above_record.nil?
    tmp_id = self.sequence_id
    self.update_attribute(self.class.sequence_field, above_record.sequence_id)
    above_record.update_attribute(self.class.sequence_field, tmp_id)
  end

  #向下
  def down
    under_record = self.class.where("#{self.class.sequence_field} > ?", self.sequence_id).order('sid ASC').first
    return if under_record.nil?
    tmp_id = self.sequence_id
    self.update_attribute(self.class.sequence_field, under_record.sequence_id)
    under_record.update_attribute(self.class.sequence_field, tmp_id)
  end

  #记录的sid值
  def sequence_id
    return self.send(self.class.sequence_field)
  end

  module ClassMethod
    #设置用于排序的字段名
    def set_sequence_field(field_name)
      self.instance_variable_set(:@seq_field, field_name)
    end

    def sequence_field
      return self.instance_variable_get(:@seq_field)
    end
  end
end