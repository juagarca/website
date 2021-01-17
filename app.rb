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

  @songs = []

  doc.search('.chartlist-row').first(10).each do |row|
    title = row.at('.chartlist-name').children[1].attributes['title'].value
    artist = row.at('.chartlist-artist').children[1].attributes['title'].value
    time = row.at('.chartlist-timestamp').children[1].children.text.strip

    time = 'Listening now' if time.include?('Scrobbling')

    @songs << {
      title: title,
      artist: artist,
      time: time
    }
  end

  erb :index
end

get '/contact' do
  erb :contact
end
