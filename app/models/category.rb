class Category < ActiveRecord::Base
  attr_accessible :name

  validates :name,
            :length => {:in => 3..20},
            :uniqueness => true

  has_many :blogs
end
