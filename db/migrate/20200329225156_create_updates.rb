class CreateUpdates < ActiveRecord::Migration[5.2]
  def change
    create_table :updates do |t|
      t.text :body
      t.string :date
      t.references :entry, foreign_key: true

      t.timestamps
    end
  end
end
