class Api::MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)
    @message.user = current_user
    if @message.save
       ActionCable.server.broadcast 'messages',
        message: @message.content,
        user: @message.user.username
        head :ok
        
        render :show 
    else 
      redirect_to api_group_url(@message.group_id)
    end
  end

  private

    def message_params
      params.require(:message).permit(:body, :group_id)
    end
end