class BoardsController < ApplicationController
  
  def index
    @boards = Board.all
    
    respond_to do |format|
      format.html
      format.json render json: @boards
    end
  end
  
  def show
    @board = Board.find(params[:id])
    
    render json: @board
  end
  
end
