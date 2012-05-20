# -coding: utf-8 -
class Blog < ActiveRecord::Base
  attr_accessible :content, :seo_desc, :seo_kwd, :slug, :status, :tag, :title, :category_id

  validates :title, :length => {:in => 5..100}
  validates :content, :length => {:in => 10..100000}
  validates :slug, :uniqueness => true

  before_validation :clean_slug
  before_save :fill_html_content
  
  after_save :update_category_count

  belongs_to :category

  #将slug中的非法字符过滤掉，如果没有slug则用时间戳代替
  def clean_slug
    if self.slug.blank?
      self.slug = Time.now.to_i.to_s
    else
      self.slug = self.slug.gsub(/[^a-zA-Z\-0-9]/, '-').downcase
    end
  end

  #将markup的content转换为html并写入字段
  def fill_html_content
    self.html_content = Klog::Markdown.render(self.content)
  end
  
  #保存后更新对应的分类的blog_count字段
  def update_category_count
    if self.category_id_changed?
      Category.increment_counter(:blog_count, self.category_id)
      Category.decrement_counter(:blog_count, self.category_id_was)
    end
  end

end
