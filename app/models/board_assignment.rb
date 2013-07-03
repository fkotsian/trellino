class BoardAssignment < ActiveRecord::Base
  attr_accessible :user_id, :board_id
  
  validates :user, :board, presence: true
  
  belongs_to :user, inverse_of: :board_assignments
  belongs_to :board, inverse_of: :board_assignments
end
