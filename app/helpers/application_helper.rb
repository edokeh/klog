module ApplicationHelper
  def error_for(record)
    render :partial => "admin/common/error_for", :locals => {:record => record}
  end

  def admin_nav_class(url)
    if request.fullpath.starts_with? url
      return 'class="active"'.html_safe
    else
      return ''
    end
  end
end
