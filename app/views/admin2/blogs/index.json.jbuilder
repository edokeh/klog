json.array! @blogs do |blog|
  json.title blog.title
  json.slug blog.slug
  json.publish blog.publish?
  json.comment_count blog.comment_count
  json.created_at l(blog.created_at, :format=>:long)
  json.category blog.category, :id, :name if blog.category.present?
end