require 'test_helper'

class SidebarCellTest < Cell::TestCase
  test "show" do
    invoke :show
    assert_select "p"
  end
  

end
