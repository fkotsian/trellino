class Card < ActiveRecord::Base
  attr_accessible :title, :description, :rank, :list_id
  
  validates :title, :rank, :list_id, presence: true
  validates :rank, uniqueness: { scope: :list_id }
  
  belongs_to :list
end
