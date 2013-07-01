Trellino::Application.routes.draw do

  resources :boards, only: [:index, :show]
  resource :session, only: [:new, :create, :destroy]

  root to: 'sessions#new'
end
