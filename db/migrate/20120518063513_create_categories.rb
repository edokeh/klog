class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name, :null=>false, :limit=>20
      t.integer :blog_count

      t.timestamps
    end
  end
end
