class Artist < ApplicationRecord

  has_many :paintings, dependent: :destroy
  
  validates :name, :age, :gender, presence: true

end
