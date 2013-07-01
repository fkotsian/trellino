class BoardAssignment < ActiveRecord::Base
  attr_accessible :user_id, :board_id
  
  validates :user_id, :board_id, presence: true
  
  belongs_to :user
  belongs_to :board
end
