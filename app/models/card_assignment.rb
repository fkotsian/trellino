class CardAssignment < ActiveRecord::Base
  attr_accessible :user_id, :card_id
  
  validates :user, :card, presence: true
  
  belongs_to :user, inverse_of: :card_assignments
  belongs_to :card, inverse_of: :card_assignments
end
