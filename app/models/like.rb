class Like < ApplicationRecord 


    validates :moment, :user, presence:true 
    
    belongs_to :moment, 
    primary_key: :id,
    foreign_key: :moment_id, 
    class_name: :Moment

    belongs_to :user, 
    primary_key: :id, 
    foreign_key: :user_id, 
    class_name: :User
end 