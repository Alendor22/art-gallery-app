class Api::V1::PaintingsController < ApplicationController
  before_action :set_painting, only: [:show, :update, :destroy]

  # GET /paintings
  def index
    @paintings = Painting.all.sort_paintings

    render json: @paintings, include: [:artist]
  end

  # GET /paintings/1
  def show
    render json: @painting, include: [:artist]
  end

  # POST /paintings
  def create
    @painting = Painting.new(painting_params)

    if @painting.save
      render json: @painting, include: [:artist], status: :created #location: @painting
    else
      render json: @painting.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /paintings/1
  def update
    if @painting.update(painting_params)
      render json: @painting
    else
      render json: @painting.errors, status: :unprocessable_entity
    end
  end

  # DELETE /paintings/1
  def destroy
    if @painting.destroy 
      render json: {message: "Painting deleted!"}, status: 200
    else
      render json: {message: "Painting failed to delete! "}, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_painting
      @painting = Painting.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def painting_params
      params.require(:painting).permit(:title, :style, :price, :url, :artist_id)
    end
end
