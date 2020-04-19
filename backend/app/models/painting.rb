class Painting < ApplicationRecord

  belongs_to :artist

  validates :title, :style, :price, presence: true

  scope :sort_paintings, -> {order('paintings.artist_id desc')}
  
end
