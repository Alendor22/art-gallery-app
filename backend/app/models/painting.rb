class Painting < ApplicationRecord

  has_many :art_galleries
  has_many :artists, through: :art_galleries

end
