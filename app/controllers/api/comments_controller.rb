class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :index 
    else 
      render json: @comment.errors.full_messages, status: 422 
    end 

  end

  def show 
    @comment = Comment.find(params[:id])
    @new_comment = @comment.replies.new
  end

  def index 
    @comments = Comment.all 
    render :index 
  end 


  def update 
    @comment = Comment.find_by(id: comment_params[:id])
    
    if @comment.update_attributes(comment_params)
      render :index 
    else 
      render json: @comment.errors.full_messages, status: 422
    end 
  end 



  private 
  def comment_params 
    params.require(:comment).permit(:id, :user_id, :moment_id, :body, :parent_comment_id)
  end 
end