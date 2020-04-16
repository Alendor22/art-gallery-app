class Painting < ApplicationRecord

  belongs_to :artist

  validates :title, :style, :price, presence: true
  
end
