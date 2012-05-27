module BlogsHelper
  
  def blog_nav_class(status)
    return 'class="active"'.html_safe if params[:status].to_i==status
  end
end
