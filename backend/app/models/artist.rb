class Artist < ApplicationRecord

  has_many :paintings
  
  validates :name, :age, :gender, presence: true

  
end
