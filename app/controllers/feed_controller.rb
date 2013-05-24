# -*- encoding : utf-8 -*-
class FeedController < ApplicationController

  def show
    expires_in 1.hours, :public=>true
    @blogs = Blog.publish.order('created_at DESC').all
    
    respond_to do |format|
      format.html
      format.rss { render :layout => false }
    end
  end

end
