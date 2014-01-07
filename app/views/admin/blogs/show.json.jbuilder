json.extract! @blog, :id, :title, :comment_count, :created_at, :slug, :content, :tag_list, :category_id, :status
json.attaches @blog.attaches
json.extract! @blog, :html_content if params[:detail]
json.publish @blog.publish?
json.category @blog.category, :name if @blog.category.present?