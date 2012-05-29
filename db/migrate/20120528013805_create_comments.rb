class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :nick
      t.string :email
      t.text :content
      t.string :ip
      t.integer :commentable_id
      t.string :commentable_type
      t.integer :blog_id
      t.boolean :is_admin

      t.timestamps
    end
  end
end
