require 'date'
class EntriesController < ApplicationController
  def home
    @entry = Entry.new
  end

  def index
    @entry = Entry.all

  end
  def create
    @entry = Entry.new(entry_params)
    @entry.date = Date.today.strftime
    @entry.save
    redirect_to entries_path
  end

  private

  def entry_params
    params.require(:entry).permit(:date, :body)
  end

end
