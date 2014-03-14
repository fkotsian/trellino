module Api
  class BoardsController < ApiController

    def index
      @boards = Board.includes(:lists, :cards).for_member(current_user)
      @lists = []
      @boards.each { |board| @lists << board.lists }
      @cards = []
      @boards.each { |board| @cards << board.cards }
      @myID = current_user.id
      render json: @boards
    end

    def show
      @board = Board.find(params[:id])
      render json: @board
    end

    def create
      @board = current_user.boards.build(board_params)
      if @board.save
        render json: @board
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end

    def update
      @board = current_user.boards.find(params[:id])

      if params[:newMemberEmail]
        email = params[:newMemberEmail]
        new_member = User.find_by_email(email)
        new_member && !@board.members.include?(new_member) && @board.members << new_member
      end

      if @board.update_attributes(board_params)
        render json: @board
      else
        render json: { errors: @board.errors.full_messages }, status: 422
      end
    end

    def destroy
      current_user.boards.find(params[:id]).try(:destroy)
      render json: {}
    end

    private
    def board_params
      params.require(:board).permit(:title, :description)
    end
  end
end
