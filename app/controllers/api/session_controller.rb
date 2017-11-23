class Api::SessionController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username], 
      params[:user][:password]
    )


    if @user
      login(@user)
      redirect_to api_user_url(@user.id)
    else 
      render json: ["Invalid username or password"], status: 401
    end 
  end

  def destroy
    if current_user
      logout! 
      render json: { message: "Logged Out"}
    else 
      render json: ["No user is logged in"], status: 401 
    end 
  end
end