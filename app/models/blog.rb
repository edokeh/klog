# -*- encoding : utf-8 -*-
class Blog < ActiveRecord::Base
  include TruncateHtmlHelper
  # 状态常量，发布/草稿
  S_DRAFT = 0
  S_PUBLISH = 1

  #extend Enumerize
  #enumerize :status, :in => {:draft => 0, :publish => 1}, :predicates => true, :scope => true
  #scope :publish, with_status(:publish)
  #scope :draft, with_status(:draft)

  acts_as_taggable

  attr_accessible :content, :seo_desc, :seo_kwd, :slug, :status, :title, :category_id, :tag_list

  validates :title, :length => {:in => 3..100}
  validates :content, :length => {:in => 10..100000}
  validates :slug, :uniqueness => true

  before_validation :clean_slug
  before_save :fill_slug
  before_save :fill_html_content
  before_save :fill_html_content_summary
  
  #保存时，如果是发布状态，增加分类的blog count
  after_save :increase_blog_count, :if=>:publish?
  #如果修改了已发布的，则减少之前分类的blog count
  after_save :decrease_blog_count, :if=>:modify_publish?
  after_destroy :decrease_blog_count, :if=>:publish?

  belongs_to :category
  has_many :attaches, :as=>:parent, :dependent => :destroy
  has_many :all_comments, :class_name=>'Comment', :foreign_key=>:blog_id, :dependent => :destroy
  has_many :comments, :as=>:commentable, :include=>[:comments]

  scope :publish, where(:status=>S_PUBLISH)
  scope :draft, where(:status=>S_DRAFT)

  def publish?
    return self.status == S_PUBLISH
  end

  def publish!
    self.status = S_PUBLISH
    #self.status = :publish
    self.save
  end

  def draft?
    return self.status == S_DRAFT
  end

  #是否修改了已发布的blog
  def modify_publish?
    self.status == S_PUBLISH && self.status_was == S_PUBLISH
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

  #将生成的html内容做个截取，放进字段保存
  def fill_html_content_summary
    self.html_content_summary = truncate_html(self.html_content, :length => 250, :omission => '', :break_token => '<!-- truncate -->')
  end

  #增加对应分类的blog_count
  def increase_blog_count
    Category.increment_counter(:blog_count, self.category_id)
  end

  #减少之前对应分类的blog_count，如果分类没有改变，则是当前的分类
  def decrease_blog_count
    Category.decrement_counter(:blog_count, self.category_id_was)
  end

end
