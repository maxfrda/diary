require 'date'
class EntriesController < ApplicationController
  def home
    @entry = Entry.new(entry_params)
  end

  def create
    @entry = Entry.new(entry_params)
    @entry.date = Date.today.strftime
  end

  private

  def entry_params
    params.permit(:date, :body)
  end

end
