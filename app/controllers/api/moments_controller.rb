class Api::MomentsController < ApplicationController

  def create
    @moment = Moment.new(moment_params)
    if @moment.save
      render :show 
    else 
      render json: @moment.errors.full_messages, status: 422 
    end 

  end

  def index 
    @moments = Moment.all 
    render :index 
  end 

  def show 
    @moment = Moment.find_by(id: params[:id])
    render :show 
  end 

  def update 
    @moment = Moment.find_by(id: moment_params[:id])
    
    if @moment.update_attributes(moment_params)
      render :show 
    else 
      render json: @moment.errors.full_messages, status: 422
    end 
  end 


  private 
  def moment_params 
    params.require(:moment).permit(:id, :user_id, :group_id, :body, :img_url)
  end 
end