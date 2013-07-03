class Board < ActiveRecord::Base
  attr_accessible :title, :description
  
  validates :title, presence: true
  
  has_many :board_assignments, inverse_of: :board
  has_many :members, through: :board_assignments, source: :user, inverse_of: :boards
  has_many :lists, dependent: :destroy
  
end
