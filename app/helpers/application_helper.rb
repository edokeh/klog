# -coding: utf-8 -
module ApplicationHelper
  include ActsAsTaggableOn::TagsHelper

  def error_for(record)
    render :partial => "admin/common/error_for", :locals => {:record => record}
  end

  #后台页面导航栏中tab是否激活
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

  #前台导航栏中tab是否激活
  def public_nav_class(*urls)
    urls.each do |url|
      return 'class="active"'.html_safe if Regexp.new(url).match(request.path)
    end
    return ''
  end

  #根据路径自动引入相应的js
  def page_js_tag
     javascript_include_tag "#{params[:controller]}/#{action_name}"
  end

  def markdown_editor(f, method=:content)
    render :partial=>'admin/common/markdown_editor', :locals=>{:f=>f, :method=>method}
  end

end
