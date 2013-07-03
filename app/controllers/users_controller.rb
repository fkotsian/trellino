class UsersController < ApplicationController
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:id])
    
    if @user.save
      user.reset_session_token!
      session[:session_token] = user.session_token
      
      redirect_to root_url
    else
      render json: { errors: @user.errors.full_messages }
    end
  end
end
