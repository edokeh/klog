# encoding: utf-8

class AttachUploader < CarrierWave::Uploader::Base
  IMAGE_EXTENSIONS = %w(jpg jpeg gif png)
  DOCUMENT_EXTENSIONS = %w(pdf ppt pptx rar zip)

  include CarrierWave::MiniMagick
  include CarrierWave::MimeTypes

  # Include the Sprockets helpers for Rails 3.1+ asset pipeline compatibility:
  # include Sprockets::Helpers::RailsHelper
  # include Sprockets::Helpers::IsolatedHelper

  # Choose what kind of storage to use for this uploader:
  storage :file

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    #"uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
    "uploads/#{model.class.to_s.underscore}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process :scale => [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  process :set_content_type
  process :resize_to_limit => [750, nil], :if => :image?

  # Create different versions of your uploaded files:
  #version :thumb, :if=>:is_image? do
  #  process :resize_to_limit => [200, 200]
  #end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_white_list
    IMAGE_EXTENSIONS + DOCUMENT_EXTENSIONS
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  def filename
    if super.present?
      # current_path 是 Carrierwave 上传过程临时创建的一个文件，有时间标记，所以它将是唯一的
      @name ||= Digest::MD5.hexdigest(File.dirname(current_path))
      "#{@name}.#{file.extension.downcase}"
    end
  end

  protected

  def image?(file)
    return file.content_type.include?('image')
  end
end
