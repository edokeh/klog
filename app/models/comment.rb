# -coding: utf-8 -
class Comment < ActiveRecord::Base
  attr_accessible :blog_id, :commentable_id, :commentable_type, :content, :email, :nick

  validates :content, :presence => true
  validates :nick, :presence => true
  validates :email, :presence => true

  belongs_to :commentable, :polymorphic => true
  belongs_to :blog
  has_many :comments, :as => :commentable, :include => [:comments], :dependent => :destroy

  #增删时，修改blog的评论条数
  after_save :increase_comment_count
  after_destroy :decrease_comment_count

  def increase_comment_count
    Blog.increment_counter(:comment_count, self.blog_id)
  end

  def decrease_comment_count
    Blog.decrement_counter(:comment_count, self.blog_id)
  end
end
