# -coding: utf-8 -
class Attach < ActiveRecord::Base
  attr_accessible :file

  before_create :fill_attributes
  after_destroy :delete_file

  belongs_to :parent, :polymorphic=>true

  mount_uploader :file, AttachUploader

  def self.update_parent(ids, parent)
    attaches = self.where(:id=>ids)
    attaches.update_all(:parent_id=>parent.id, :parent_type=>parent.class.to_s)
  end

  #填充content_type,file_size字段
  def fill_attributes
    self.content_type = file.file.content_type
    self.file_size = file.file.size
  end

  #删除对应的文件
  def delete_file
    self.remove_file!
  end

  def image?
    return self.content_type.include?('image')
  end

  #用于生成json的数据
  def json_data
    return {
        'file_name' => self.file_name,
        'url' => self.file.url,
        'is_image' => self.image?,
        'id' => self.id,
        'is_complete' => true
    }
  end
end
