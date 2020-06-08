Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'entries#home'

  resources :entries, only: [:create, :index, :show, :destroy] do
    resources :updates, only: [:create]
 end
end
