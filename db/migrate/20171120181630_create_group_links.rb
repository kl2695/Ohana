class CreateGroupLinks < ActiveRecord::Migration[5.1]
  def change
    create_table :group_links do |t|
      t.integer :user_id, null: false 
      t.integer :group_id, null: false 
      t.timestamps 
    end
    add_index :group_links, :user_id 
    add_index :group_links, :group_id 
  end
end
