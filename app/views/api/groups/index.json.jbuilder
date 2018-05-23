
json.groups do 
  @groups.each do |group|
    json.set! group.id do
      json.partial!('api/groups/group', group: group)
    end 
  end

  json.currentGroup 'none'

end 

 json.messages do 
  @groups.each do |group|
      group.messages.reverse()[0..30].each do |message|
          json.set! message.id do 
            json.partial!('api/messages/message', message: message)
          end 
      end 
    end 
  end