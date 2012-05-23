class Admin::AttachesController < Admin::ApplicationController

  def create
    up = AttachUploader.new
    up.store!(params[:file])
    puts session[:admin]
    render :text=>"ok".to_json
  end

end
