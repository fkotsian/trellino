class TodoItemsController < ApplicationController
  
  def create
    @card = Card.find(params[:card_id])
    @item = @card.todo_items.build(params[:todo_item])
    
    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors.full_messages }, status: 422
    end
  end
  
  def update
    @item = TodoItem.find(params[:id])
    @item.update_attributes(params[:todo_item])
    
    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    @item = TodoItem.find(params[:id])
    @item.destroy
    render json: nil
  end
  
end
