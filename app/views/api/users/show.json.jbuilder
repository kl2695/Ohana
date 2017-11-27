json.users do 
    json.partial!('api/users/user', user: @user)
end 

json.groups @user.groups.each do |group|
    json.partial!('api/groups/group', group:group)
end 


json.moments @user.moments.each do |moment| 
    json.partial!('api/moments/moment', moment:moment)
end 

json.comments @user.moments.each do |moment|
    moment.comments.each do |comment| 
        json.partial!('api/comments/comment', comment:comment)
    end 
end 