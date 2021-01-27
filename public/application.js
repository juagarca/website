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

// Html for summary section
const summaryHTML =
  `<br> <br><br> <br><br> <br><br>
  <h1>Lorem ipsum dolor sit amet, adipisicing elit. Corporis blanditiis officia, delectus neque debitis similique.</h1>
  <br>
  <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam blanditiis eveniet officiis possimus. Vitae debitis placeat molestias sapiente, hic eligendi, repellat aliquid cum aut officiis iusto quasi itaque labore accusantium.</p>
  <br><br><br> <br><br> <br><br> <br><br> <br><br> <br><br> <br>
  <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque corporis blanditiis officia, delectus neque debitis similique reprehenderit accusantium repellendus voluptatem voluptatibus, alias quis quidem quasi unde temporibus dolores sunt nemo.</h3>
  <p>Lorem ipsum dolor sit amet, adipisicing elit. Corporis blanditiis officia, delectus neque debitis similique.</h1>
  <br> <br><br> <br><br> <br><br> <br><br> <br><br><br> <br><br><br> <br><br>
  <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam blanditiis eveniet officiis possimus. Vitae debitis placeat molestias sapiente, hic eligendi, repellat aliquid cum aut officiis iusto quasi itaque labore accusantium.</p>
  <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque corporis blanditiis officia, delectus neque debitis similique reprehenderit accusantium repellendus voluptatem voluptatibus, alias quis quidem quasi unde temporibus dolores sunt nemo.</h3>
  <h1>Lorem ipsum dolor sit amet, adipisicing elit.</h1>`;

// Html for projects section
const projectsHTML =
  `<h2>Projects</h2><br>
  <div id="pintpal" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('images/pintpal.png');">
    PintPal
  </div>
  <div id="hiremyhound" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('images/hiremyhound.png');">
    HireMyHound
  </div>
  <div id="chat" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('images/chat.png');">
    Chat
  </div>
  <div id="garage" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('images/garage.png');">
    Garage
  </div>`;

const cvHTML =
  `<h2>CV</h2><br>
  <a href="https://drive.google.com/file/d/1znDklEe-f-cpiwssKoaZx2JMGJG6ZHEh/view?usp=sharing" target="_blank" style="display: flex; justify-content: space-between;">
    <img class="cv" src="images/CV-1.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
    <img class="cv" src="images/CV-2.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
  </a>`;

const contentContainer = document.querySelector(".content-container");
const PintPalHTML =
  `<div>
    <h2 style="text-align: center;">PintPal</h2>
  </div>`;

//Delete PintPalCard and add the Pintal Project
function deletePintPalCard() {
  document.getElementById('pintpal').remove();
  contentContainer.insertAdjacentHTML('beforeEnd', PintPalHTML);
}

//click event for home button
const homeBtn = document.querySelector('.fa-home')
homeBtn.addEventListener('click', (event) => {
  const summary = document.querySelector('.summary');
  summary.innerHTML = "";
  summary.insertAdjacentHTML('beforeend', summaryHTML);
  summary.classList.add('show');

  const projects = document.querySelector('.cards-projects');
  if (projects.classList.contains('show')) {
    projects.classList.remove('show')
  }
  projects.innerHTML = "";

  const cv = document.querySelector('.cv-container');
  if (cv.classList.contains('show')) {
    cv.classList.remove('show')
  }
  cv.innerHTML = "";
});


//click event for projects button
const projectsBtn = document.querySelector('.fa-tools')
projectsBtn.addEventListener('click', (event) => {
  const summary = document.querySelector('.summary');
  if (summary.classList.contains('show')) {
    summary.classList.remove('show')
  }
  summary.innerHTML = "";

  const projects = document.querySelector('.cards-projects');
  projects.innerHTML = "";
  projects.insertAdjacentHTML('beforeend', projectsHTML);
  projects.classList.add('show');


  const cv = document.querySelector('.cv-container');
  if (cv.classList.contains('show')) {
    cv.classList.remove('show')
  }
  cv.innerHTML = "";

  // Selecting project cards
  const pintpalCard = document.getElementById('pintpal');

  // Click event for pintpalCard
  pintpalCard.addEventListener('click', (event) => {
    if (pintpalCard.classList.contains('show-card')) {
      pintpalCard.classList.remove('show-card');
      setTimeout(deletePintPalCard, 900);
    }
  });
});

//click event for cv button
const cvButton = document.querySelector('.fa-file-code')
cvButton.addEventListener('click', (event) => {

  const summary = document.querySelector('.summary');
  if (summary.classList.contains('show')) {
    summary.classList.remove('show')
  }
  summary.innerHTML = "";

  const projects = document.querySelector('.cards-projects');
  if (projects.classList.contains('show')) {
    projects.classList.remove('show')
  }
  projects.innerHTML = "";

  const cv = document.querySelector('.cv-container');
  cv.innerHTML = "";
  cv.insertAdjacentHTML('beforeend', cvHTML);
  cv.classList.add('show');
});


// Function calls
fetchSongs();
setTimeout(deleteLoading, 900);
setInterval(fetchSong, 30000);
cities.forEach((city) => {
  fetchWeather(city);
});

//Populate summary by default
const summary = document.querySelector('.summary');
summary.insertAdjacentHTML('beforeend', summaryHTML);
summary.classList.add('show');
