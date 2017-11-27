json.extract! group, :id, :name, :img_url

user_ids = [] 
group.users.each do |user|
    user_ids << user.id 
end 

json.userIds user_ids 