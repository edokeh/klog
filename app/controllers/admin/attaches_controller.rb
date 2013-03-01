# -coding: utf-8 -
class Admin::AttachesController < Admin::ApplicationController

  def index
    @attaches = Attach.order('created_at DESC').includes(:parent).page(params[:page])
  end

  #上传附件
  def create
    # JS 中会传递对于图像的尺寸要求 max_width
    attach = Attach.new_by_params(params[:attach])

    if attach.save
      result = {:status => 'success', :attach=>attach.json_data}
    else
      result = {:status => 'error'}
    end

    render :json=>result.to_json
  end

  def destroy
    attach = Attach.find(params[:id])
    attach.destroy

    respond_to do |format|
      format.html { redirect_to :back, :notice=>'删除成功！' }
      format.json { head :no_content }
    end

  end

end
