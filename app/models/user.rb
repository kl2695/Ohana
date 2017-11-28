class User < ApplicationRecord

validates :username, :email, :session_token, presence: true, uniqueness: true 
validates :password, length: {minimum: 6, allow_nil: true}

after_initialize :ensure_session_token 


has_many :moments, 
primary_key: :id, 
foreign_key: :user_id, 
class_name: :Moment 

has_many :messages, 
primary_key: :id, 
foreign_key: :user_id, 
class_name: :Message 

has_many :group_links, 
primary_key: :id, 
foreign_key: :user_id, 
class_name: :GroupLink 

has_many :likes, 
primary_key: :id, 
foreign_key: :user_id, 
class_name: :Like 

has_many :groups, 
through: :group_links, 
source: :group 

has_many :comments, 
inverse_of: :author 





attr_reader :password 

def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    if @user.nil? 
        return nil 
    else 
        return @user if @user.valid_password?(password)
    end
    return nil 
end 

def password=(password)
    @password = password 
    self.password_digest = BCrypt::Password.create(password)
end 

def valid_password?(password)
    pass_hash = BCrypt::Password.new(self.password_digest)
    pass_hash.is_password?(password)
end

def reset_session_token! 
    self.session_token = SecureRandom::urlsafe_base64(32)
    self.save 
    self.session_token
end

private 
def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(32)
end 
end