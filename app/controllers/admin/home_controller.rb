# -coding: utf-8 -
class Admin::HomeController < Admin::ApplicationController
  #管理首页
  def show
    @hotest_blogs = Blog.order('comment_count DESC').limit(5)
  end

end