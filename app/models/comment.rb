class Comment < ApplicationRecord 



  validates :body,:author, presence: true

  after_initialize :ensure_moment_id!

  belongs_to :moment, inverse_of: :comments

  belongs_to :author,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :replies,
    class_name: :Comment,
    foreign_key: :parent_comment_id,
    primary_key: :id

  belongs_to :parent_comment,
    class_name: :Comment,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    optional: true

     private
  def ensure_moment_id!
    self.moment_id ||= self.parent_comment.moment_id if parent_comment
  end
end 