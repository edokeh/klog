json.array! @blogs do |blog|
  json.extract! blog, :id, :title, :comment_count, :created_at, :slug
  json.publish blog.publish?
  json.category blog.category, :name if blog.category.present?
end