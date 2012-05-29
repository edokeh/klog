# -coding: utf-8 -
class Admin::HomeController < Admin::ApplicationController
  #管理首页
  def show
    @hotest_blogs = Blog.order('comment_count DESC').limit(5)
  end

  #根据markdown格式内容返回html
  def preview
    content = params[:content]
    html_content = Klog::Markdown.render(content)
    render :json=>html_content.to_json
  end

end