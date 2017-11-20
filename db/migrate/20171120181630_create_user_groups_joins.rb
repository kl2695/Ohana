class CreateUserGroupsJoins < ActiveRecord::Migration[5.1]
  def change
    create_table :user_groups_joins do |t|
      t.integer :user_id, null: false 
      t.integer :group_id, null: false 
      t.timestamps 
    end
    add_index :user_groups_joins, :user_id 
    add_index :user_groups_joins, :group_id 
  end
end
