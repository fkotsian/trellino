Trellino::Application.routes.draw do
  resources :boards, only: [:index, :show, :create, :destroy] do
    resources :lists, only: [:index, :show, :create, :update, :destroy]
  end
  resources :cards, only: [:create, :update, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]
  root to: 'boards#index'
end
