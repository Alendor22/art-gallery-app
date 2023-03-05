class CreateArtists < ActiveRecord::Migration[7.0]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :age
      t.string :gender

      t.timestamps
    end
  end
end
