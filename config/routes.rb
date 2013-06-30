Trellino::Application.routes.draw do

  resources :index only: [:index, :show]

  root 'boards#index'
end
