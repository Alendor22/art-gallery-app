class Artist < ApplicationRecord

  has_many :art_galleries
  has_many :paintings, through: :art_galleries
  has_one_attached :painting_image

  def painting_url
    if self.painting_image.attachment
      self.painting_image.attachment.service_url
    end
  end

end
