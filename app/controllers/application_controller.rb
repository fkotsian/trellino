class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  include SessionsHelper

  def require_login!
    redirect_to new_session_url unless current_user
  end

  def current_user
    session_token = session[:session_token]
    return nil if session_token.nil?
    @current_user ||= User.find_by_session_token(session_token)
  end
end
