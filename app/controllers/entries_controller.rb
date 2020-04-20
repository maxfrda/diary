require 'date'
class EntriesController < ApplicationController
  def home
    @entry = Entry.new
    @entries = Entry.all
    @user = current_user
    @update = Update.new

  end

  def index
    @user = current_user
    @entry = Entry.all
  end

  def show
    @entry = Entry.find(params[:id])
    @user = current_user
    @update = Update.new
  end

  def update
    @update = Update.new(update_params)
    @entry = Entry.find(params[:id])
    @update.entry = @entry
    @update.date = Date.today.strftime

    if @update.save
      redirect_to root_path
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

   def update_params
    params.require(:update).permit(:body, :date)
  end

end
