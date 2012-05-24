class Admin::AttachesController < Admin::ApplicationController

  #上传附件
  def create
    attach = Attach.new
    attach.file = params[:file]

    if attach.save
      result = {:status => 'success',
                :data=>{:url => attach.file.url,
                        :attach_id => attach.id,
                        :is_image => attach.image?,
                        :filename => attach.filename}}
    else
      result = {:status => 'error'}
    end

    render :json=>result.to_json
  end

  def destroy
    attach = Attach.find(params[:id])
    attach.destroy

    head :no_content
  end

end
