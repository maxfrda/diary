class Entry < ApplicationRecord
  belongs_to :user
  has_many :updates, dependent: :destroy

  validates :body, length: { minimum: 2}
end
