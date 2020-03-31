class UpdatesController < ApplicationController

  def new
    @update = Update.new
  end

  def create
    @update = Update.new
    @entry = Entry.find(params[:entry_id])
    @update.entry = @entry
  end

  private

  def update_params
    params.require(:update).permit(:body, :date)
  end
end
