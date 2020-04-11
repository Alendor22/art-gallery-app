class Painting < ApplicationRecord

  has_many :artists
  has_many :artists, through: :art_gallery

end
