class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
  
    if @user.save
      login(@user)
      render :new
    else 
      render json: @user.errors.full_messages, status: 422 
    end 

  end

  def index 
    @users = User.all 
    render :index 
  end 

  def show 
    @user = User.find_by(id: params[:id])
    render :show 
  end 


  def update 
    @user = User.find_by(id: user_params[:id])
    
    if @user.update_attributes(user_params)
      render :show 
    else 
      render json: @user.errors.full_messages, status: 422
    end 
  end 

  private 
  def user_params 
    params.require(:user).permit(:id, :username, :password, :email, :first_name, :last_name, :img_url)
  end 
end