# -coding: utf-8 -
class Blog < ActiveRecord::Base
  # 状态常量，发布/草稿
  S_DRAFT = 0
  S_PUBLISH = 1

  attr_accessible :content, :seo_desc, :seo_kwd, :slug, :status, :tag, :title, :category_id

  validates :title, :length => {:in => 5..100}
  validates :content, :length => {:in => 10..100000}
  validates :slug, :uniqueness => true

  before_validation :clean_slug
  before_save :fill_slug
  before_save :fill_html_content
  after_create :increase_blog_count, :if=>:publish?
  after_update :update_blog_count, :if=>:publish?
  after_destroy :decrease_blog_count, :if=>:publish?

  belongs_to :category

  scope :publish, where(:status=>S_PUBLISH)
  scope :draft, where(:status=>S_DRAFT)

  def publish?
    self.status == S_PUBLISH
  end

  #将slug中的非法字符过滤掉
  def clean_slug
    self.slug = self.slug.gsub(/[^a-zA-Z\-0-9]/, '-').downcase if self.slug.present?
  end

  #如果没有slug则用时间戳代替
  def fill_slug
    self.slug = Time.now.to_i.to_s if self.slug.blank?
  end

  #将markup的content转换为html并写入字段
  def fill_html_content
    self.html_content = Klog::Markdown.render(self.content)
  end

  #新建已发布的blog时，增加对应分类的blog_count
  def increase_blog_count
    Category.increment_counter(:blog_count, self.category_id)
  end

  #修改blog时，根据情况更新对象分类的blog_count
  def update_blog_count
    Category.increment_counter(:blog_count, self.category_id)
    #如果是修改的已发布blog，需要做count的修正
    if self.status_was == S_PUBLISH
      Category.decrement_counter(:blog_count, self.category_id_was)
    end
  end

  #删除blog时，减少对应分类的blog_count
  def decrease_blog_count
    Category.decrement_counter(:blog_count, self.category_id)
  end

end
