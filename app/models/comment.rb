# -coding: utf-8 -
class Comment < ActiveRecord::Base
  attr_accessible :blog_id, :commentable_id, :commentable_type, :content, :email, :nick

  belongs_to :commentable, :polymorphic => true
  belongs_to :blog
  has_many :comments, :as=>:commentable, :include=>[:comments], :dependent=>:destroy

  #保存时，增加blog的评论条数
  after_save :increase_comment_count
  #删除时，减少blog的评论数
  after_destroy :decrease_comment_count

  def nick
    return attributes['nick'].blank? ? '匿名' : attributes['nick']
  end

  def increase_comment_count
    Blog.increment_counter(:comment_count, self.blog_id)
  end

  def decrease_comment_count
    Blog.decrement_counter(:comment_count, self.blog_id)
  end
end
