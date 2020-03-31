class Update < ApplicationRecord
  belongs_to :entry
  validates :body, presence: true
end
