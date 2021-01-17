require 'sinatra'
require 'sinatra/reloader' if development?
require 'pry-byebug'
require 'better_errors'
require 'nokogiri'
require 'open-uri'

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = File.expand_path('..', __FILE__)
end

get '/' do
  html_content = open('https://www.last.fm/user/Darin86').read
  doc = Nokogiri::HTML(html_content)

  @songs = doc.search('.chartlist-name').each do |song|
    song.text
  end
  erb :index
end

get '/contact' do
  erb :contact
end
