class ListsController < ApplicationController
  
  def index
    @lists = List.where("board_id = ?", params[:board_id])
    render json: @lists
  end
  
  def show
    @list = List.find(params[:list_id])
    render json: @list
  end
  
  def create
    @list = List.new(params[:list])
    
    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end
  
  def update
    @list = List.find(params[:id])
    @list.update_attributes(params[:list])
    
    if @list.save
      render json: @list
    else
      render json: { errors: @list.errors.full_messages }, status: 422
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    render json: nil
  end
end
