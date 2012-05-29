class Page < ActiveRecord::Base
  attr_accessible :content, :slug, :title

  before_validation :clean_slug
  before_save :fill_slug
  before_save :fill_html_content

  validates :title, :length => {:in => 2..10}
  validates :content, :length => {:in => 10..100000}
  validates :slug, :presence => true

  #将slug中的非法字符过滤掉
  def clean_slug
    self.slug = self.slug.gsub(/[^a-zA-Z\-0-9]/, '-').downcase if self.slug.present?
  end

  #将markup的content转换为html并写入字段
  def fill_html_content
    self.html_content = Klog::Markdown.render(self.content)
  end
end
