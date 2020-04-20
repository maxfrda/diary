class Entry < ApplicationRecord
  belongs_to :user
  has_many :updates

  validates :body, length: { minimum: 2}
end
