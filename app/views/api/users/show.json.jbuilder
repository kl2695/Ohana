users = [] 

@user.groups.each do |group| 
    group.users.each do |user|
        users << user 
    end 
end

@user.moments.each do |moment| 
    moment.comments.each do |comment| 
        users << comment.author 
    end 
end



json.users do 
    users.each do |user| 
        json.set! user.id do 
            json.partial!('api/users/user', user: user)
        end 
    end 
end 

json.groups do 
    @user.groups.each do |group|
        json.set! group.id do 
            json.partial!('api/groups/group', group:group)
        end 
    end 
end 


json.moments do 
    @user.moments.each do |moment| 
        json.set! moment.id do 
            json.partial!('api/moments/moment', moment:moment)
        end
    end 
end 

