const apiKey = '9003b582cac1084f57538941e2c6ba19';
const cities = ["London", "Valencia", "Tel Aviv", "Mykonos", "New York", "San Francisco", "Los Angeles", "Berlin"];

const buildWeatherHTML = (city, weather, description, iconUrl, temp) => {
  city = `<div class="city-card">
                <div class="city-image" style='background-image: url(${iconUrl});'></div>
                <div class="citi-info"
                     style="display: flex;
                            flex-direction: column;
                            justify-content: center;">
                  <p style='margin: 0 0 0 8px';>${city}</p>
                  <p style='margin: 0 0 0 8px';>${Math.round(temp)}°C</p>
                </div>
          </div>`;
  document.querySelector(".city-cards-container").insertAdjacentHTML('beforeEnd', city);
};

const fetchWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const weather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
      buildWeatherHTML(city, weather, description, iconUrl, temp);
    });
};

const buildSongHTML = (song) => {
  songHTML = `<div class="song-card">
                <div class="song-image" style='background-image: url(${song.image});'></div>
                <div class="song-info">
                  <p>${song.title}</p>
                  <p>by ${song.artist}</p>
                  <p><em>${song.time}</em></p>
                </div>
              </div>`;
  document.querySelector('.songs-card').insertAdjacentHTML('afterbegin', songHTML);
};

function fetchSong() {
  songsOnPage = document.querySelectorAll(".song-card")
  if (songsOnPage[0].childNodes && songsOnPage[0].childNodes[3].childNodes ) {
    titleFirst = songsOnPage[0].childNodes[3].childNodes[1].textContent
    fetch('./songs')
      .then(response => response.json())
      .then((songs) => {
          if (songs[0].title !== titleFirst) {
            songsOnPage[0].remove();
            songsOnPage[1].remove();
            songsOnPage[2].remove();
            songsOnPage[3].remove();
            songsOnPage[4].remove();
            buildSongHTML(songs[4]);
            buildSongHTML(songs[3]);
            buildSongHTML(songs[2]);
            buildSongHTML(songs[1]);
            buildSongHTML(songs[0]);
          }
      });
  }
}

function fetchSongs() {
  fetch('./songs')
    .then(response => response.json())
    .then((songs) => {
      buildSongHTML(songs[4]);
      buildSongHTML(songs[3]);
      buildSongHTML(songs[2]);
      buildSongHTML(songs[1]);
      buildSongHTML(songs[0]);
    });
};

fetchSongs();
setInterval(fetchSong, 30000);

cities.forEach((city) => {
  fetchWeather(city);
});
