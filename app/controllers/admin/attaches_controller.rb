class Admin::AttachesController < Admin::ApplicationController

  def create
    up = AttachUploader.new
    up.store!(params[:file])
    render :text=>"ok".to_json
  end

end
