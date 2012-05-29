# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120529082817) do

  create_table "attaches", :force => true do |t|
    t.string   "file"
    t.string   "filename"
    t.string   "content_type"
    t.string   "file_size"
    t.string   "parent_id"
    t.string   "parent_type"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "blogs", :force => true do |t|
    t.string   "title",                        :null => false
    t.text     "content",                      :null => false
    t.text     "html_content",                 :null => false
    t.string   "slug",                         :null => false
    t.string   "tag"
    t.string   "seo_kwd"
    t.string   "seo_desc"
    t.integer  "status"
    t.integer  "category_id"
    t.integer  "comment_count", :default => 0
    t.datetime "created_at",                   :null => false
    t.datetime "updated_at",                   :null => false
  end

  add_index "blogs", ["slug"], :name => "index_blogs_on_slug", :unique => true

  create_table "categories", :force => true do |t|
    t.string   "name",       :limit => 20, :null => false
    t.integer  "blog_count"
    t.datetime "created_at",               :null => false
    t.datetime "updated_at",               :null => false
  end

  create_table "comments", :force => true do |t|
    t.string   "nick"
    t.string   "email"
    t.text     "content"
    t.string   "ip"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.integer  "blog_id"
    t.boolean  "is_admin"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "pages", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.string   "slug"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "settings", :force => true do |t|
    t.string   "key"
    t.string   "value"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
