class BoardsController < ApplicationController
  before_filter :require_login!
  
  def index
    @boards = Board.includes(:lists).where(:member == current_user)
    
    respond_to do |format|
      format.html
      format.json {render json: @boards}
    end
  end
  
  def show
    @board = Board.find(params[:id])
    
    render json: @board
  end
  
end
