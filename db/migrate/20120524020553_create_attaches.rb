class CreateAttaches < ActiveRecord::Migration
  def change
    create_table :attaches do |t|
      t.string :file, :null=>false
      t.string :file_name, :null=>false
      t.string :content_type, :null=>false
      t.string :file_size, :null=>false
      t.string :parent_id
      t.string :parent_type

      t.timestamps
    end
  end
end
