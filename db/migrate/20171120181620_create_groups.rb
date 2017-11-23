class CreateGroups < ActiveRecord::Migration[5.1]
  def change
    create_table :groups do |t|
      t.string :name, null: false 
      t.string :img_url 
      t.timestamps
    end
    add_index :groups, :name 
  end
end
