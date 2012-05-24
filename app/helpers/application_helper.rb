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

  #有meta标签显示cookie中session的值
  def session_meta_tags
    session_key = Rails.application.config.session_options[:key]
    [
        tag('meta', :name => 'session-key', :content => session_key),
        tag('meta', :name => 'session-value', :content => cookies[session_key])
    ].join("\n").html_safe
  end
end
