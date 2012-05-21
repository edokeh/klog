module ApplicationHelper
  def error_for(record)
    render :partial => "admin/common/error_for", :locals => {:record => record}
  end

  #后台页面导航栏中选项是否激活
  def admin_nav_class(url)
    if request.fullpath.starts_with? url
      return 'class="active"'.html_safe
    else
      return ''
    end
  end
end
