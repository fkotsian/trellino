class ListsController < ApplicationController
  
  def index
    @lists = List.where("board_id = ?", params[:board_id])
    render json: @lists
  end
  
  def show
    @list = List.find(params[:list_id])
    render json: @list
  end
  
end
