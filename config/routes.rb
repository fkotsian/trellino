Trellino::Application.routes.draw do
  resources :boards, only: [:index, :show] do
    resources :lists, only: [:index, :show]
  end
  resource :session, only: [:new, :create, :destroy]

  root to: 'boards#index'
end
