# -*- encoding : utf-8 -*-
class ApplicationController < ActionController::Base
  protect_from_forgery

  layout 'public_layout'

  rescue_from ActiveRecord::RecordNotFound, :with => :redirect_404

  helper_method :is_admin?

  protected
  #跳转至404页面
  def redirect_404
    redirect_to '/404.html'
  end

  def is_admin?
    return session[:admin] == true
  end

  # 校验验证码
  def verify_captcha(options)
    options = {:model => options} unless options.is_a? Hash
    if Captcha.valid?(session[:captcha], params[:captcha])
      return true
    else
      attribute = options[:attribute] || :base
      message = I18n.translate('captcha.errors.verification_failed', :default => message)
      options[:model].errors.add attribute, options[:message] || message
      return false
    end
  end
end
