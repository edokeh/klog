module Test
  def self.my_method
    puts "x"
  end
end

class My
    include Test
end

My.my_method