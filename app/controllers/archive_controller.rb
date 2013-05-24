# -*- encoding : utf-8 -*-
class ArchiveController < ApplicationController

  def show
    expires_in 1.hours
    @blogs = Blog.publish.order('created_at DESC').all

    @blogs_by_year = {}

    @blogs.each do |blog|
      @blogs_by_year[blog.created_at.year] ||= []
      @blogs_by_year[blog.created_at.year] << blog
    end
  end

end
