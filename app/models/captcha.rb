# -coding: utf-8 -
require 'digest/sha1'

class Captcha < ActiveRecord::Base
  attr_accessible :key, :code

  after_destroy :destroy_pic

  # 随机取一条记录
  def self.random
    order('RAND()').first
  end

  # 随机生成一条记录
  def self.random_create(count=1)
    count.times do
      key = Digest::SHA1.hexdigest(Time.now.to_s + Captcha.count.to_s)
      code = ''
      5.times { code << (65 + rand(26)).chr }

      generate_pic(key, code)
      create(:key => key, :code => code)
    end
  end

  # 生成图片
  def self.generate_pic(key, code)
    amplitude, frequency = [2 + rand(2), 50 + rand(20)]
    params = ['-fill blue', '-edge 4', '-background white'] #style
    params << "-size #{'100x30'}"
    params << "-wave #{amplitude}x#{frequency}"
    params << "-gravity \"Center\""
    params << "-pointsize 18"
    params << "-implode 0.2"
    params << "label:#{code} \"#{File.join(Rails.public_path, 'captcha', key+'.jpg')}\""

    run("convert", params.join(' '))
  end

  # 执行系统命令
  def self.run(cmd, params = "", expected_outcodes = 0)
    command = %Q[#{cmd} #{params}].gsub(/\s+/, " ")
    command = "#{command} 2>&1"
    output = `#{command}`
    output
  end

  def self.valid?(key, code = "")
    return where(:key => key, :code => code.upcase).count > 0
  end

  def destroy_pic
    begin
      File.delete(File.join(Rails.public_path, 'captcha', self.key+'.jpg'))
    rescue Errno::ENOENT
    end
  end

  def pic_url
    return "/captcha/#{self.key}.jpg"
  end

end
