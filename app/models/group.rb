class Group < ApplicationRecord 

    validates :name, presence:true 
    
    has_many :group_links, 
    primary_key: :id, 
    foreign_key: :group_id, 
    class_name: :GroupLink

    has_many :users, 
    through: :group_links, 
    source: :ser 

    has_many :groups, 
    through: :group_links, 
    source: :group

    has_many :moments, 
    primary_key: :id,
    foreign_key: :group_id, 
    class_name: :Moment 



end 