json.groups do 
    json.partial!('api/groups/group', group: @group)
end 

users = []

@group.users.each do |user|
    users << user
    user.moments.each do |moment| 
        moment.comments.each do |comment| 
            users << comment.author 
        end 
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
    @group.users.each do |user| 
        user.moments.each do |moment| 
            json.set! moment.id do 
                json.partial!('api/moments/moment', moment: moment)
            end
        end 
    end 
end 

json.messages do 
    @group.messages.each do |message|
        json.set! message.id do 
            json.partial!('api/messages/message', message: message)
        end 
    end 
end 



