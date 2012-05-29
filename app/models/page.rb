class Page < ActiveRecord::Base
  attr_accessible :content, :slug, :title

  validates :title, :length => {:in => 3..10}
  validates :content, :length => {:in => 10..100000}
  validates :slug, :presence => true
end
