class CardsController < ApplicationController
  
  def create
    @card = Card.new(params[:card])
    
    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end
  
  def update
    @card = Card.find(params[:id])
    @card.update_attributes(params[:card])
    
    if params[:newUserEmail]
      email = params[:newUserEmail]
      new_user = User.find_by_email(email)
      new_user && !@card.users.include?(new_user) && @card.users << new_user
    end
    
    if @card.save      
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: nil
  end
  
end
