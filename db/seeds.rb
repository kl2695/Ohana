# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

kevin = User.new(username: 'kzlee51', email: 'kzlee51@gmail.com', first_name: 'kevin', last_name: 'lee', password: 'password')
kevin.save
demo = User.new(username: 'demo', email: 'demo@gmail.com', first_name: 'demo', last_name: 'demo', password: 'password')
demo.save


usersJson = ActiveSupport::JSON.decode(File.read('db/seeds/users.json'))
users = []
usersJson.each do |row|
 users << User.create!(row)
end

groupsJson = ActiveSupport::JSON.decode(File.read('db/seeds/groups.json'))
groups = [] 
groupsJson.each do |row|
  groups << Group.create!(row)
end 

group_links = Hash.new
500.times do |x|
  group_id = rand(1..25)
  user_id = rand(1..50)

  if !group_links[{group_id: group_id, user_id:user_id}]
    GroupLink.create({group_id: group_id, user_id: user_id})
    group_links[{group_id:group_id, user_id:user_id}] = 1
  end
end 

momentsJson = ActiveSupport::JSON.decode(File.read('db/seeds/moments.json'))
moments = [] 
momentsJson.each do |row| 
  moments << Moment.create!(row)
end 

commentsJson = ActiveSupport::JSON.decode(File.read('db/seeds/comments.json'))
comments = [] 
commentsJson.each do |row| 
  comments << Comment.create!(row)
end 


likesJson = ActiveSupport::JSON.decode(File.read('db/seeds/likes.json'))
likes = Hash.new 
likesJson.each do |row|
  if !likes[row]
    Like.create!(row)
    likes[row] = 1
  end
end 

messagesJson = ActiveSupport::JSON.decode(File.read('db/seeds/messages.json'))
messages = [] 
messagesJson.each do |row| 
  messages << Message.create!(row)
end 