class SideBarCell < Cell::Rails

  def show
    @recent_blogs = Blog.order('created_at desc').limit(10).all
    @categories = Category.all
    
    render
  end

end
