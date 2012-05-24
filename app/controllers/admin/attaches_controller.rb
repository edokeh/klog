class Admin::AttachesController < Admin::ApplicationController

  #上传附件
  def create
    attach = Attach.new
    attach.file = params[:file]

    result = {}
    if attach.save
      result[:status] = 'success'
      result[:filepath] = attach.file.url
      result[:attach_id] = attach.id
      result[:is_image] = attach.image?
    else
      result[:status] = 'error'
    end

    render :json=>result.to_json
  end

  def destroy
    attach = Attach.find(params[:id])
    attach.destroy

    render :head=>:no_content
  end

end
