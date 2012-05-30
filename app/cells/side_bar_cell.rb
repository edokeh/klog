class SideBarCell < Cell::Rails

  def show
    @recent_blogs = Blog.publish.order('created_at DESC').limit(10)
    @recent_comments = Comment.order('created_at DESC').limit(10)
    @categories = Category.all
    
    render
  end

end
