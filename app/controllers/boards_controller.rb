class BoardsController < ApplicationController
  before_filter :require_login!
  
  def index
    @boards = Board.includes(:cards).for_member(current_user)
    
    @cards = []
    @boards.each { |board| @cards << board.cards }
  end
  
  def show
    @board = Board.find(params[:id])
    
    render json: @board
  end
  
  def create
    @board = current_user.boards.build(params[:board])
    
    if @board.save
      render json: @board
    else
      render json: { errors: @board.errors.full_messages }
    end
  end
  
  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render json: nil
  end
  
end
