class Api::MessagesController < ApplicationController

  def create
    
    @message = Message.new(message_params)
    @message.user = current_user

    if @message.save
       ActionCable.server.broadcast "messages_#{@message.group_id}",
        message: @message.body,
        user: @message.user.username

        head :ok
    else 
      redirect_to api_group_url(@message.group_id)
    end
  end

  def index 
    @messages = Message.all 
    render :index 
  end 

  def show 
    @message = Message.find_by(id: params[:id])
    render :show 
  end 

  private

    def message_params
      params.require(:message).permit(:body, :group_id)
    end
end