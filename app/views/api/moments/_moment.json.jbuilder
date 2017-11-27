json.extract! moment, :id, :body, :img_url, :user_id, :group_id

json.comments moment.comments.each do |comment| 
    json.partial!('api/comments/comment', comment:comment)
end 