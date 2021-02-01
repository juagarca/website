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
  let className = "song-card";
  let songHTML = '';
  if (song.time == 'Listening now') {
    className += ' song-card-active'
    songHTML = `<div class='${className}'>
                    <div class="song-image" style='background-image: url(${song.image});'></div>
                    <div class="song-info">
                      <p>${song.title}</p>
                      <p>by ${song.artist}</p>
                      <p><img class="equalizer" src="images/equalizer.gif" alt="equalizer gif" width="30px">   <em>${song.time}</em></p>
                    </div>
                  </div>`;
  } else {
    songHTML = `<div class='${className}'>
                    <div class="song-image" style='background-image: url(${song.image});'></div>
                    <div class="song-info">
                      <p>${song.title}</p>
                      <p>by ${song.artist}</p>
                      <p><em>${song.time}</em></p>
                    </div>
                  </div>`;
  }
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
// logos = document.querySelector('.tools-card .tools').getElementsByTagName('img');
// for (let logo of logos) {
//     logo.addEventListener('click', (event) => {
//       // document.querySelector('.text').remove();
//       const x = event.screenX;
//       const y = event.screenY;
//       const html = `<div class="text" style='background: black; color: white; position: absolute; left:${x+10}px; top: ${y-130}px; padding: 2px 4px;'>
//                       <small>${logo.alt}</small>
//                     </div>`;
//       document.querySelector('.main').insertAdjacentHTML('beforeEnd', html);
//     });
// }

// //if there is a tool displayed, then it removes it
// document.addEventListener('mouseup', (event) => {
//   if (document.querySelector('.text')) {
//     document.querySelector('.text').remove();
//   }
// });

// Html for summary section
const summaryHTML =
  `<br> <br><br> <br><br><br>
  <h1>Hola 👋🏼 I'm Juan</h1>
  <h1>Thank you for visiting</h1>
  <h1>the House of Juagarca</h1>
  <br>
  <p>A software house with a <mark style="background-color: #0D1117; color: white; ">different</mark> perspective 👀   <span id="start" class="project-button">Start</span></p>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br>
  <div id="background"></div>
  <br><br><br><br><br><br>
  <h2 style="text-align: right;">My Background</h2>
  <div style="display: flex;">
    <div style="width: 75%;"></div>
    <div>
      <p style="text-align: right;">I was born in Valencia 🇪🇸 where I completed a BSc in <mark style="background-color: #0D1117; color: white;">Software Engineering</mark></p><p style="text-align: right;">Upon completion of my degree, I decided to move to London where I have been living and working for over a decade 😱</p>
      <p style="text-align: right; font-size: 16px; color: white;">I ❤️ this city and consider it my home  <span style="text-align: right;" id="next-story" class="project-button">Next</span></p>
    </div>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br> <br><br><br>
  <div id="story"></div>
  <br>
  <div style="width: 464px; margin: 0 auto;">
    <h2 style="text-align: center;">The Story So Far</h2>
      <p style="text-align: center;">Even though I worked as a <mark style="background-color: #0D1117; color: white;">Junior Dev</mark> 🧑🏻‍💻 right after finishing my degree, when I came to London I found difficult to find a Dev role</p>
      <p style="text-align: center; color: white; font-size: 16px;">I ended up securing a job in well known retailer and decided to take it as I needed to start earning 💰</p>
      <p style="text-align: center;">Since that point, I gained experience in different roles and industries. However, something is always been missing. Full details of my experience can be found on my <a style="color: #white;"target="_blank" href="https://www.linkedin.com/in/juagarca">LinkedIn</a> or <a style="color: #white;"target="_blank" href="https://drive.google.com/file/d/1znDklEe-f-cpiwssKoaZx2JMGJG6ZHEh/view?usp=sharing">CV</a></p>
      <ul>
        <li style="text-align: center;"><mark style="background-color: #0D1117; color: white;">Retail</mark>    |    <mark style="background-color: #0D1117; color: white;">Events</mark></li>
        <li style="margin-top: 16px; text-align: center;"><mark style="background-color: #0D1117; color: white;">Experiential Marketing</mark>    |    <mark style="background-color: #0D1117; color: white;">Tech Recruitment</mark></li>
      </ul>
      <div style="text-align: center;"><span id="next-present" class="project-button" style="margin: 0;">Next</span></div>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br><br>
  <div id="present"></div>
  <br><br><br><br>
  <div style="display: flex;" >
    <div>
      <h2>At Present</h2>
      <p>I have restarted my tech career 🙌🏼 and this is how the <mark style="background-color: #0D1117; color: white;">House of Juagarca</mark> was born</p>
      <p>In 2020 I graduated from <mark style="background-color: #0D1117; color: white;">Le Wagon</mark> the world's best coding bootcamp and it was one of the best experiences in my life 😃</p>
      <p style="color: white; font-size: 15px;">This is going to be a great year and along joining an awesome company, I will be working on my <mark style="background-color: #0D1117; color: white;">projects</mark> which I will be addding to the<a title="Projects" style="cursor: pointer;"><i class="fas fa-tools button" style="margin-right: 8px;"></i></a>section, also available on <a style="color: #74767A;"target="_blank" href="https://www.github.com/juagarca">Github</a>       <span style="text-align: center;" id="next-interest" class="project-button">Next</span></p>
    </div>
    <div style="width: 62%;"></div>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br><br><br><br><br><br>
  <h2 style="text-align: right;">Interests</h2>
  <div style="display: flex;" id="interests">
    <div style="width: 75%;"></div>
    <div>
      <p style="text-align: right;">The idea behind this project was to create an app where I could showcase both my portfolio and personal interests 🤷🏻‍♂️</p>
      <p style="text-align: right">I'm obsessed with <mark style="background-color: #0D1117; color: white;">music</mark> & pop culture, here's a sneak peak to what I'm listening to. Need the full playlist? 😛 go ahead and visit my <a style="color: white;"target="_blank" href="https://www.last.fm/user/Darin86">last.fm</a></p>
      <p style="text-align: right; color: white; font-size: 16px;">I try to go on <mark style="background-color: #0D1117; color: white;">holidays</mark> as much as I can, shocking right? I thought I'd share with you some of my favourite spots?</p>
    </div>
  </div>`;

//Populate summary by default
const summary = document.querySelector('.summary');
summary.insertAdjacentHTML('beforeend', summaryHTML);
summary.classList.add('show');

// Summary buttons transitions
document.getElementById('start').addEventListener('click', () => {
    document.getElementById('background').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
});

document.getElementById('next-story').addEventListener('click', () => {
    document.getElementById('story').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
});

document.getElementById('next-present').addEventListener('click', () => {
    document.getElementById('present').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
});

document.getElementById('next-interest').addEventListener('click', () => {
    document.getElementById('interests').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
});


// Html for projects section
const projectsHTML =
  `<h2>Projects</h2>
  <div class="project-container" id="pintpal-container">
    <div id="pintpal" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/pintpal.png');">
      PintPal
    </div>
  </div>
  <div class="project-container" id="hiremyhound-container">
    <div id="hiremyhound" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/hiremyhound.png');">
      HireMyHound
    </div>
  </div>
  <div class="project-container" id="chat-container">
    <div id="chat" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/chat.png');">
      Chat
    </div>
  </div>
  <div class="project-container" id="garage-container">
    <div id="garage" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/garage.png');">
      Garage
    </div>
  </div>`;

const projects = document.querySelector(".cards-projects");

  // <div style="text-align: right;">
  //   <a target="_blank" href="https://www.pintpal.me/" class="project-button">Website</a>
  // </div>

//Delete project cards and add PintPal Project
function deleteProjectCardsAndAddPintPal() {
  document.getElementById('pintpal-project').classList.add("show-project");
}

function deleteProjectsAndAddPintpal() {
  document.getElementById('pintpal-container').remove();
  document.getElementById('hiremyhound-container').remove();
  document.getElementById('chat-container').remove();
  document.getElementById('garage-container').remove();

  const pintPalHTML =
    `<div class="project" id='pintpal-project'>
      <h3 style="text-align: right; font-size: 24px; font-weight: bolder;">PintPal</h3>
      <div class="pintpal-images-container">
        <img src="images/PintPal/pintpal01.png" class="pintpal-image">
        <img src="images/PintPal/pintpal02.png" class="pintpal-image">
        <img src="images/PintPal/pintpal03.png" class="pintpal-image">
      </div>
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Description</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit. Eos ullam, laborum mollitia, earum porro cupiditate? Neque laudantium alias, sapiente totam, ex asperiores ipsam quidem molestiae voluptatibus maiores amet suscipit. Aliquid!</p>
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Tools</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit.</p>
    </div>`;

  projects.insertAdjacentHTML('beforeEnd', pintPalHTML);
  setTimeout(deleteProjectCardsAndAddPintPal, 1);
}

//Delete project cards and add HireMyHound Project
function deleteProjectCardsAndAddHireMyHound() {
  document.getElementById('hiremyhound-project').classList.add("show-project");
}

function deleteProjectsAndAddHireMyHound() {
  document.getElementById('pintpal-container').remove();
  document.getElementById('hiremyhound-container').remove();
  document.getElementById('chat-container').remove();
  document.getElementById('garage-container').remove();

  const hireMyHoundHTML =
  `<div class="project" id='hiremyhound-project'>
    <h3 style="text-align: right; font-size: 24px; font-weight: bolder;">HireMyHound</h3>
    <div class="hiremyhound-images-container">
      <img src="images/HireMyHound/hiremyhound01.png" class="hiremyhound-image">
      <img src="images/HireMyHound/hiremyhound02.png" class="hiremyhound-image">
      <img src="images/HireMyHound/hiremyhound03.png" class="hiremyhound-image">
      <img src="images/HireMyHound/hiremyhound04.png" class="hiremyhound-image">
    </div>
    <br>
    <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Description</h3>
    <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit. Eos ullam, laborum mollitia, earum porro cupiditate? Neque laudantium alias, sapiente totam, ex asperiores ipsam quidem molestiae voluptatibus maiores amet suscipit. Aliquid!</p>
    <br>
    <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Tools</h3>
    <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit.</p>
  </div>`;

  projects.insertAdjacentHTML('beforeEnd', hireMyHoundHTML);
  setTimeout(deleteProjectCardsAndAddHireMyHound, 1);
}

//Delete project cards and add Chat Project
function deleteProjectCardsAndAddChat() {
  document.getElementById('chat-project').classList.add("show-project");
}

function deleteProjectsAndAddChat() {
  document.getElementById('pintpal-container').remove();
  document.getElementById('hiremyhound-container').remove();
  document.getElementById('chat-container').remove();
  document.getElementById('garage-container').remove();


  const chatHTML =
    `<div class="project" id='chat-project'>
      <h3 style="text-align: right; font-size: 24px; font-weight: bolder;">Chat</h3>
      <div class="chat-images-container">
        <img src="images/Chat/chat01.png" class="chat-image">
      </div>
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Description</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit. Eos ullam, laborum mollitia, earum porro cupiditate? Neque laudantium alias, sapiente totam, ex asperiores ipsam quidem molestiae voluptatibus maiores amet suscipit. Aliquid!</p>
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Tools</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit.</p>
    </div>`;

  projects.insertAdjacentHTML('beforeEnd', chatHTML);
  setTimeout(deleteProjectCardsAndAddChat, 1);
}

//Delete project cards and add Garage Project
function deleteProjectCardsAndAddGarage() {
  document.getElementById('garage-project').classList.add("show-project");
}

function deleteProjectsAndAddGarage() {
  document.getElementById('pintpal-container').remove();
  document.getElementById('hiremyhound-container').remove();
  document.getElementById('chat-container').remove();
  document.getElementById('garage-container').remove();

  const garageHTML =
    `<div style="text-align: center;" class="project" id="garage-project">
      <h3 style="text-align: right; font-size: 24px; font-weight: bolder;">Garage</h3>
      <div class="garage-images-container">
        <img src="images/Garage/garage01.png" class="garage-image">
        <img src="images/Garage/garage02.png" class="garage-image">
      </div>
      <img src="images/Garage/garage03.png" class="garage-image" style="margin-top: 16px;">
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Description</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit. Eos ullam, laborum mollitia, earum porro cupiditate? Neque laudantium alias, sapiente totam, ex asperiores ipsam quidem molestiae voluptatibus maiores amet suscipit. Aliquid!</p>
      <br>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder;">Tools</h3>
      <p style="text-align: right;">Lorem ipsum dolor sit amet consectetur adipisicing, elit.</p>
    </div>`;

  projects.insertAdjacentHTML('beforeEnd', garageHTML);
  setTimeout(deleteProjectCardsAndAddGarage, 1);
}

//click event for home button
const homeBtn = document.querySelector('.fa-home')
homeBtn.addEventListener('click', (event) => {
  const summary = document.querySelector('.summary');
  summary.innerHTML = "";
  summary.insertAdjacentHTML('beforeend', summaryHTML);
  summary.classList.add('show');

  // Click event for project button in summary
  const summaryProjectBtn = document.querySelectorAll('.fa-tools')[1];
  summaryProjectBtn.addEventListener('click', (event) => {
    if (summary.classList.contains('show')) {
      summary.classList.remove('show')
    }
    summary.innerHTML = "";

    if (projects.classList.contains('show')) {
      projects.classList.remove('show');
    }
    projects.innerHTML = "";
    projects.insertAdjacentHTML('beforeend', projectsHTML);
    projects.classList.add('show');
  });

  if (projects.classList.contains('show')) {
    projects.classList.remove('show')
  }
  projects.innerHTML = "";

  const cv = document.querySelector('.cv-container');
  if (cv.classList.contains('show')) {
    cv.classList.remove('show')
  }
  cv.innerHTML = "";

  // Scroll to top of the summary
  document.getElementById('top').scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  });
});

//Click event for project buttons
projectBtns = document.querySelectorAll('.fa-tools');

projectBtns.forEach((projectBtn) => {
  projectBtn.addEventListener('click', (event) => {
    const summary = document.querySelector('.summary');
    if (summary.classList.contains('show')) {
      summary.classList.remove('show')
    }
    summary.innerHTML = "";

    if (projects.classList.contains('show')) {
      projects.classList.remove('show');
    }
    projects.innerHTML = "";
    projects.insertAdjacentHTML('beforeend', projectsHTML);
    projects.classList.add('show');


    const cv = document.querySelector('.cv-container');
    if (cv.classList.contains('show')) {
      cv.classList.remove('show')
    }
    cv.innerHTML = "";

    // Scroll to top of the projects
    document.getElementById('top').scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });

    // Selecting project cards
    const pintpalCard = document.getElementById('pintpal');
    const hiremyhoundCard = document.getElementById('hiremyhound');
    const chatCard = document.getElementById('chat');
    const garageCard = document.getElementById('garage');

    // Click event for pintpalCard
    pintpalCard.addEventListener('click', (event) => {
      pintpalCard.classList.remove('show-card');
      hiremyhound.classList.remove('show-card');
      chat.classList.remove('show-card');
      garage.classList.remove('show-card');

      // Remove container border
      document.getElementById('pintpal-container').style.border = 'none';
      document.getElementById('hiremyhound-container').style.border = 'none';
      document.getElementById('chat-container').style.border = 'none';
      document.getElementById('garage-container').style.border = 'none';

      setTimeout(deleteProjectsAndAddPintpal, 500);
    });

    // Click event for hiremyhoundCard
    hiremyhoundCard.addEventListener('click', (event) => {
      pintpalCard.classList.remove('show-card');
      hiremyhound.classList.remove('show-card');
      chat.classList.remove('show-card');
      garage.classList.remove('show-card');

      // Remove container border
      document.getElementById('pintpal-container').style.border = 'none';
      document.getElementById('hiremyhound-container').style.border = 'none';
      document.getElementById('chat-container').style.border = 'none';
      document.getElementById('garage-container').style.border = 'none';

      setTimeout(deleteProjectsAndAddHireMyHound, 500);
    });

    // Click event for chatCard
    chatCard.addEventListener('click', (event) => {
      pintpalCard.classList.remove('show-card');
      hiremyhound.classList.remove('show-card');
      chat.classList.remove('show-card');
      garage.classList.remove('show-card');

      // Remove container border
      document.getElementById('pintpal-container').style.border = 'none';
      document.getElementById('hiremyhound-container').style.border = 'none';
      document.getElementById('chat-container').style.border = 'none';
      document.getElementById('garage-container').style.border = 'none';

      setTimeout(deleteProjectsAndAddChat, 500);
    });

    // Click event for garageCard
    garageCard.addEventListener('click', (event) => {
      pintpalCard.classList.remove('show-card');
      hiremyhound.classList.remove('show-card');
      chat.classList.remove('show-card');
      garage.classList.remove('show-card');

      // Remove container border
      document.getElementById('pintpal-container').style.border = 'none';
      document.getElementById('hiremyhound-container').style.border = 'none';
      document.getElementById('chat-container').style.border = 'none';
      document.getElementById('garage-container').style.border = 'none';

      setTimeout(deleteProjectsAndAddGarage, 500);
    });
  });
});

const cvHTML =
  `<h2>CV</h2>
  <a href="https://drive.google.com/file/d/1znDklEe-f-cpiwssKoaZx2JMGJG6ZHEh/view?usp=sharing" target="_blank" style="display: flex; justify-content: space-between; margin-top: 40px;">
    <img class="cv" src="images/CV-1.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
    <img class="cv" src="images/CV-2.png" alt="CV" width="300" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
  </a>`;


//click event for cv button
const cvButton = document.querySelector('.fa-file-code')
cvButton.addEventListener('click', (event) => {

  const summary = document.querySelector('.summary');
  if (summary.classList.contains('show')) {
    summary.classList.remove('show')
  }
  summary.innerHTML = "";

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


