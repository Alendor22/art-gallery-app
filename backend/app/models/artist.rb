class Artist < ApplicationRecord

  has_many :paintings
  
  validates :name, :age, :gender, presence: true
  before_save :create_painting

  # AIzaSyCrp_bpCBRLt-viXwiHd21RsliqDE7e5Ag
  
  def create_painting
  end


end
