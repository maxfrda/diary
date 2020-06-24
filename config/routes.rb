Rails.application.routes.draw do
  devise_for :users
 authenticated :user do
  root :to => 'entries#index', as: :authenticated_root
end
root :to => 'pages#home'

  resources :entries, only: [:create, :destroy, :index] do
    resources :updates, only: [:create]
 end
 get '/demo' => 'entries#demo'
end
