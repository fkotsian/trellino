class Board < ActiveRecord::Base
  attr_accessible :title, :description
  
  validates :title, presence: true
  
  has_many :lists
end
