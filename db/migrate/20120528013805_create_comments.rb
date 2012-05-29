class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :nick
      t.string :email
      t.text :content, :null=>false
      t.string :ip
      t.integer :commentable_id, :null=>false
      t.string :commentable_type, :null=>false
      t.integer :blog_id, :null=>false
      t.boolean :is_admin

      t.timestamps
    end
  end
end
