class Api::GroupsController < ApplicationController

  def create
    @group = Group.new(group_params)
  
    if @group.save
      render :show 
    else 
      render json: @group.errors.full_messages, status: 422 
    end 

  end

  def index 
    @groups = Group.all 
    
    render :index 
  end 

  def show 
    @group = Group.find_by(id: params[:id])
    render :show 
  end 

  def update 
    @group = Group.find_by(id: group_params[:id])
    @position = group_params[:position].to_i
    
    update_params = {id: group_params[:id], name: group_params[:name],img_url:group_params[:img_url]}
    if @group.update_attributes(update_params)
      render :update
    else 
      render json: @group.errors.full_messages, status: 422
    end 
  end 


  private 
  def group_params 
    params.require(:group).permit(:id, :name, :img_url, :position)
  end 

end