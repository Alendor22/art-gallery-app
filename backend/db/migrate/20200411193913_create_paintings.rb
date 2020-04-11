class CreatePaintings < ActiveRecord::Migration[6.0]
  def change
    create_table :paintings do |t|
      t.string :title
      t.string :style
      t.string :price

      t.timestamps
    end
  end
end
