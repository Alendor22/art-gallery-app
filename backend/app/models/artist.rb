class Artist < ApplicationRecord

  has_many :paintings
  has_many :paintings, through: :art_gallery

end
