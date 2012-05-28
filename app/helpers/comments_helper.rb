module CommentsHelper
  
  def render_comments(commentable, options)
    comments = commentable.comments
    level = options[:level]
    render :partial=>'comments/index', :locals=>{:comments=>comments, :level=>level}
  end
  
end
