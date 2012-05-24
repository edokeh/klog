class Attach < ActiveRecord::Base
  attr_accessible :file

  before_create :fill_attributes
  after_destroy :delete_file

  belongs_to :blog

  mount_uploader :file, AttachUploader

  #填充content_type,file_size字段
  def fill_attributes
    self.content_type = file.file.content_type
    self.file_size = file.file.size
    self.filename = file.file.original_filename
  end

  #删除对应的文件
  def delete_file
    self.remove_file!
  end

  def image?
    return self.content_type.include?('image')
  end
end
