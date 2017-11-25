class Moment < ApplicationRecord 

    validates :body, :author, presence:true 
    

    belongs_to :author, 
    primary_key: :id, 
    foreign_key: :user_id, 
    class_name: :User 

    belongs_to :group, 
    primary_key: :id, 
    foreign_key: :group_id, 
    class_name: :Group, 
    optional: true 

    has_many :comments,
    primary_key: :id, 
    foreign_key: :moment_id, 
    class_name: :Comment

    def comments_by_parent
        comments_by_parent = Hash.new { |hash, key| hash[key] = [] }

        self.comments.includes(:author).each do |comment|
        comments_by_parent[comment.parent_comment_id] << comment
        end

        comments_by_parent
    end

end 