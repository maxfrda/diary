class CreateEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :entries do |t|
      t.text :body
      t.string :date

      t.timestamps
    end
  end
end
