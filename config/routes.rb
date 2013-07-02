Trellino::Application.routes.draw do
  resources :boards, only: [:index, :show, :create, :destroy] do
    resources :lists, only: [:index, :show]
  end
  
  resources :cards
  
  resource :session, only: [:new, :create, :destroy]

  root to: 'boards#index'
end
