module Api
  class ListsController < ApiController
    def index
      @lists = Board.find(params[:board_id]).lists
      render json: @lists
    end

    def show
      @list = List.find(params[:list_id])
      render json: @list
    end

    def create
      @list = List.new(list_params)
      if @list.save
        render json: @list
      else
        render json: { errors: @list.errors.full_messages }, status: 422
      end
    end

    def update
      @list = List.find(params[:id])

      if @list.update_attributes(list_params)
        render json: @list
      else
        render json: { errors: @list.errors.full_messages }, status: 422
      end
    end

    def destroy
      List.find(params[:id]).try(:destroy)
      render json: nil
    end

    private
    def list_params
      params.require(:list).permit(:title, :rank, :board_id)
    end
  end
end
