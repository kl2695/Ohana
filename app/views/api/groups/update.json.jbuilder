json.groups do 
    json.partial!('api/groups/group', group: @group)
end 

users = []

@group.users.each do |user|
    users << user
end 

 @group.moments.each do |moment| 
    users << moment.author 
    moment.comments.each do |comment| 
        users << comment.author 
    end 
end 


json.users do 
    users.uniq.each do |user|
        json.set! user.id do 
            json.partial!('api/users/user', user:user)
        end
    end 
end 


json.moments do
    @group.moments.each do |moment|
        json.set! moment.id do 
            json.partial!('api/moments/moment', moment: moment)
        end
    end 
end 

@position ||= 30

json.messages do 
    @group.messages[0..@position].each do |message|
        json.set! message.id do 
            json.partial!('api/messages/message', message: message)
        end 
    end 
end 



