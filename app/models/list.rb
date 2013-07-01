class List < ActiveRecord::Base
  attr_accessible :title, :rank, :board_id
  
  validates :title, :rank, :board_id, presence: true
  validates :rank, uniqueness: {scope: :board_id}
  
  belongs_to :board
  has_many :cards
  
  def as_json(options={})
    super(options.merge({include: :cards}))
  end
end
