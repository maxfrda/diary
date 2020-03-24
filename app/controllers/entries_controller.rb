require 'date'
class EntriesController < ApplicationController
  def home
    @entry = Entry.new
    @user = current_user
  end

  def index
    @entry = Entry.all

  end
  def create
    @entry = Entry.new(entry_params)
    @entry.date = Date.today.strftime
    @entry.user = current_user

    if
      @entry.save
      redirect_to entries_path
    else
      redirect_to new_user_registration_path
  end
  end

  private

  def entry_params
    params.require(:entry).permit(:date, :body)
  end

end
