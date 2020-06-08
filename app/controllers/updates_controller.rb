class UpdatesController < ApplicationController


  def create
    @update = Update.new(update_params)
    @entry = Entry.find(params[:entry_id])
    @update.entry = @entry
    @update.date = Date.today.strftime

    if @update.save
      p 'saved'
    else
      p 'not saved'
    end
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js { head :no_content }
    end

  end

  private

  def update_params
    params.require(:update).permit(:body, :date)
  end
end
