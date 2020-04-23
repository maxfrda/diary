class Entry < ApplicationRecord
  belongs_to :user
  has_many :updates, dependent: :destroy

end
