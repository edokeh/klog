class SideBarCell < Cell::Rails

  def show
    @recent_blogs = Blog.publish.order('created_at DESC').limit(10)
    @categories = Category.all
    @tags = Blog.tag_counts_on(:tags)

    render
  end

end
