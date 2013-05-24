# -*- encoding : utf-8 -*-
class PagesController < ApplicationController

  def show
    @page = Page.where(:slug=>params[:page_slug]).first
    raise  ActiveRecord::RecordNotFound if @page.nil?
  end

end
