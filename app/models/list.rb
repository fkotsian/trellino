class List < ActiveRecord::Base
  attr_accessible :title, :rank, :board_id
  
  validates :title, :rank, :board_id, presence: true
  
  belongs_to :board
  has_many :cards, dependent: :destroy
end
