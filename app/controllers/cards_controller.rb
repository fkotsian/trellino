class CardsController < ApplicationController
  
  def create
    @card = Card.new(params[:card])
    
    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }
    end
  end
  
  def update
    @card = Card.find(params[:id])
    @card.update_attributes(params[:card])
    
    if @card.save
      render json: @card
    else
      render json: { errors: @card.errors.full_messages }
    end
  end
  
  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render json: nil
  end
  
end
