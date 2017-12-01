class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :moment_id, null: false
      t.integer :user_id, null: false 
    end
    add_index :likes, [:moment_id, :user_id], unique: true 
  end
end
