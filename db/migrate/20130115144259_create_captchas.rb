class CreateCaptchas < ActiveRecord::Migration
  def change
    create_table :captchas do |t|
      t.string :key
      t.string :code

      t.timestamps
    end

    Captcha.random_create(10)
  end
end
