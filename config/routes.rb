Klog::Application.routes.draw do

  root :to=>'blogs#index'

  resources :blogs do
    resources :comments
  end
  resources :categories
  resources :tags

  get '/blog/:id.html'=>'blogs#show', :as=>:blog
  get '/feed'=>'feed#show', :format=>:rss, :as=>:feed
  get '/archive.html'=>'archive#show', :as=>:archive

  namespace :admin2 do
    get '/'=>'home#show'
  end

  namespace :admin do
    resources :blogs do
      post 'publish', :on=>:member
    end
    resources :categories
    resources :comments
    resources :attaches
    resources :pages do
      post 'up', :on=>:member
      post 'down', :on=>:member
    end

    namespace :settings do
      resource :admin_pass
      resource :website
      resource :sidebar
    end

    resource :session
    get '/'=>'home#show'
    post '/preview'=>'home#preview'
  end

  get '/:page_slug.html'=>'pages#show', :as=>:page
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/_index.html.erb.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
