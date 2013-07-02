class Board < ActiveRecord::Base
  attr_accessible :title, :description
  
  validates :title, presence: true
  
  has_many :board_assignments
  has_many :members, through: :board_assignments, source: :user
  has_many :lists, dependent: :destroy
end
