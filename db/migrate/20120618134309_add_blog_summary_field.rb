class AddBlogSummaryField < ActiveRecord::Migration
  def up
    change_table :blogs do |t|
      t.text :html_content_summary, :null=>false

      Blog.all.each do |blog|
        blog.fill_html_content_summary
        blog.save
      end
    end
  end

  def down
    change_table :blogs do |t|
      t.remove :html_content_summary
    end
  end
end
