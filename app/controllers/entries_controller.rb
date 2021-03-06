require 'date'
class EntriesController < ApplicationController

  def demo
    @entry = Entry.new
    @update = Update.new
  end

  def index
    @entry = Entry.new
    @entries = Entry.all
    @user = current_user
    @update = Update.new
  end

  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy
    respond_to do |format|
      format.html { redirect_to root_path }
      format.js { head :no_content }
    end
  end


  def create
    @entry = Entry.new(entry_params)
    @entry.date = Date.today.strftime
    @entry.user = current_user

    if
      @entry.save
      redirect_to root_path
    else
      redirect_to new_user_registration_path
    end
  end

  private

  def entry_params
    params.require(:entry).permit(:date, :body)
  end

end
