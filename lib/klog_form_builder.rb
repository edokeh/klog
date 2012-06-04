# -coding: utf-8 -

class KlogFormBuilder < ActionView::Helpers::FormBuilder
  
  # markdown编辑器，带预览功能
  def markdown_editor(method, options={})
    tab = <<-html
      <ul class="nav nav-tabs editor-tab">
        <li class="active" data-type="edit">
          <a href="javascript:void(0);">编辑</a>
        </li>
        <li data-type="preview">
          <a href="javascript:void(0);">预览</a>
        </li>
      </ul>
    html

    preview = <<-html
      <div id="preview"></div>
    html

    help = <<-html
      <span class="help-block">使用markdown格式编写，按下M或者点此查看语法</span>
    html

    output = ''
    output << tab.html_safe
    output << text_area(method, options.merge(:data=>{:preview=>true}))
    output << preview
    output << help
    return output.html_safe
  end
  
end