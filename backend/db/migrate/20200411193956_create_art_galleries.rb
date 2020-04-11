class CreateArtGalleries < ActiveRecord::Migration[6.0]
  def change
    create_table :art_galleries do |t|
      t.integer :artist_id
      t.integer :painting_id
       
      t.timestamps
    end
  end
end
