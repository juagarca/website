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
      const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
      buildWeatherHTML(city, weather, description, iconUrl, temp);
    });
};

const buildSongHTML = (song) => {
  let className = "song-card"
  if (song.time == 'Listening now...') {
    className += ' song-card-active'
  }

  const songHTML = `<div class='${className}'>
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

function deleteLoading() {
  document.querySelector('.loading').remove();
}

// Click event for logos to show name of tool
logos = document.querySelector('.tools-card .tools').getElementsByTagName('img');
for (let logo of logos) {
    logo.addEventListener('click', (event) => {
      // document.querySelector('.text').remove();
      const x = event.screenX;
      const y = event.screenY;
      const html = `<div class="text" style='background: black; color: white; position: absolute; left:${x+10}px; top: ${y-130}px; padding: 2px 4px;'>
                      <small>${logo.alt}</small>
                    </div>`;
      document.querySelector('.main').insertAdjacentHTML('beforeEnd', html);
    });
}

//if there is a tool displayed, then it removes it
document.addEventListener('mouseup', (event) => {
  if (document.querySelector('.text')) {
    document.querySelector('.text').remove();
  }
});


//click event for projects button
const projectsBtn = document.querySelector('.fa-tools')
projectsBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const projectsHTML = "Hola Pap";
  document.querySelector('.main').innerHTML = "";
  document.querySelector('.main').insertAdjacentHTML('beforeEnd', projectsHTML);
});

//click event for cv button
const cvButton = document.querySelector('.fa-file-code')
cvButton.addEventListener('click', (event) => {
  event.preventDefault();
  const cvHTML =
    `<div>
      <br><br><br><br>
      <a href="https://drive.google.com/file/d/1znDklEe-f-cpiwssKoaZx2JMGJG6ZHEh/view?usp=sharing" target="_blank" style="display: flex; justify-content: space-around;">
        <img class="cv" src="images/CV-1.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
        <img class="cv" src="images/CV-2.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
      </a>
    </div>`;
  document.querySelector('.main').innerHTML = "";
  document.querySelector('.main').insertAdjacentHTML('beforeEnd', cvHTML);
});

// Function calls
fetchSongs();
setTimeout(deleteLoading, 900);
setInterval(fetchSong, 30000);
cities.forEach((city) => {
  fetchWeather(city);
});
