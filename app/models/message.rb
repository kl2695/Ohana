class Message < ApplicationRecord 

    validates :body, presence: true 
    
    belongs_to :group, 
    primary_key: :id, 
    foreign_key: :group_id, 
    class_name: :Group

    belongs_to :user,
    primary_key: :id, 
    foreign_key: :user_id, 
    class_name: :User

end 