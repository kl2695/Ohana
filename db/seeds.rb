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


50.times do |x|
  User.create({username: Faker::Internet.user_name, email: Faker::Internet.email, first_name: Faker::Name.name, last_name: Faker::Name.name, password: Faker::Internet.password(6,10)})
end

20.times do |x|
  Group.create({name: Faker::Team.name})
end 

200.times do |x|
  GroupLink.create({group_id: rand(1..20), user_id: rand(1..50)} )
end 
200.times do |x|
  Moment.create({group_id: rand(1..20), user_id: rand(1..50), body: Faker::RickAndMorty.quote} )
end 
