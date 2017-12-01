users = [@user] 


json.moments do 
    @user.moments.each do |moment| 
        moment.comments.each do |comment|
            users << comment.author 
        end 
        json.set! moment.id do 
            json.partial!('api/moments/moment', moment:moment)
        end
    end 
end 


json.users do 
    users.each do |user| 
        json.set! user.id do 
            json.partial!('api/users/user', user: user)
        end 
    end 
end 