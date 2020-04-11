class Artist < ApplicationRecord

  has_many :art_galleries
  has_many :paintings, through: :art_galleries

end
