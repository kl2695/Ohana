
json.groups do 
  @groups.each do |group|
    json.set! group.id do
      json.partial!('api/groups/group', group: group)
    end 
  end
  
  json.currentGroup 'none'
end 