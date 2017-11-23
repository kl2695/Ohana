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
    
    if @group.update_attributes(group_params)
      render :show 
    else 
      render json: @group.errors.full_messages, status: 422
    end 
  end 


  private 
  def group_params 
    params.require(:group).permit(:id, :name, :img_url)
  end 
end