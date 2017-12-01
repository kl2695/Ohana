users = [] 




json.moments do 
  @moments.each do |moment|
    users << moment.author 
    
    moment.comments.each do |comment| 
      users << comment.author 
    end 
    json.set! moment.id do 
      json.partial!('api/moments/moment', moment: moment)
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




