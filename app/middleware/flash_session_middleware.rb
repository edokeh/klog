require 'rack/utils'

class FlashSessionMiddleware

  def initialize(app, session_key = '_session_id')
    @app = app
    @session_key = session_key
  end

  def call(env)
    if env['HTTP_USER_AGENT'] =~ /^(Adobe|Shockwave) Flash/
      params = ::Rack::Utils::Multipart.parse_multipart(env)
      env['HTTP_COOKIE'] = [@session_key, params[@session_key]].join("=") unless params[@session_key].nil?
    end
    @app.call(env)
  end
end