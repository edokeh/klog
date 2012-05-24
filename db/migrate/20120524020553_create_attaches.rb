class CreateAttaches < ActiveRecord::Migration
  def change
    create_table :attaches do |t|
      t.string :file
      t.string :filename
      t.string :content_type
      t.string :file_size
      t.string :blog_id

      t.timestamps
    end
  end
end
