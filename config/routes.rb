Rails.application.routes.draw do


  mount ActionCable.server => '/cable'
  
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy], controller: :session
    resources :groups, only: [:create, :index, :show, :update, :destroy]
    resources :moments, only: [:create, :index, :show, :update, :destroy]
    resources :comments, only: [:create, :index, :update, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :messages, only: [:create, :index, :show]
  end


  root to: 'static_pages#root'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
