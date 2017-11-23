@moments.each do |moment|
  json.set! moment.id do
   json.partial!('api/moments/moment', moment: moment)
  end
end