Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy], controller: :session
    resources :groups, only: [:create, :index, :show, :update, :destroy]
    resources :moments, only: [:create, :index, :show, :update, :destroy]
    resources :comments, only: [:create, :index, :update, :destroy]
  end


  root to: 'static_pages#root'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
