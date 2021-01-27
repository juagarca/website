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
  erb :index
end

get '/songs' do
  # Lastfm url to scrape
  url = 'https://www.last.fm/user/Darin86'
  html_content = URI.open(url).read
  doc = Nokogiri::HTML(html_content)

  songs = []
  # Scanning first 5 songs
  doc.search('.chartlist-row').first(5).each do |row|
    title = row.at('.chartlist-name').children[1].attributes['title'].value
    artist = row.at('.chartlist-artist').children[1].attributes['title'].value
    time = row.at('.chartlist-timestamp').children[1].children.text.strip
    time = 'Listening now...' if time.include?('Scrobbling')

    image = row.at('.chartlist-image').children[1].children[1].attributes['src'].value
    # Passing songs to the view
    songs << {
      title: title,
      artist: artist,
      time: time,
      image: image
    }
  end

  JSON songs
end

get '/testing' do
end
