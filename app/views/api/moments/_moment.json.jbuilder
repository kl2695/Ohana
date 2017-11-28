json.extract! moment, :id, :body, :img_url, :user_id, :group_id

json.comments moment.comments.each do |comment| 
    json.partial!('api/comments/comment', comment:comment)
end 

likes = [] 
moment.likes.each do |like| 
    likes << like.user_id 
end 

json.likes likes 
