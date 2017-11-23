class CreateMoments < ActiveRecord::Migration[5.1]
  def change
    create_table :moments do |t|
      t.integer :user_id, null: false 
      t.integer :group_id
      t.string :body, null: false 
      t.string :img_url 
      t.timestamps 
    end
    add_index :moments, :user_id 
    add_index :moments, :group_id 
  end
end
