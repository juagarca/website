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
                      <p style="margin-top: 2px;">${song.title}</p>
                      <p>by ${song.artist}</p>
                      <p><img class="equalizer" src="images/giphy.gif" alt="equalizer gif">   <em>${song.time}</em></p>
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

function scrollToTop() {
  document.querySelector('.main').scrollTop = 0;
};

// Summary marquees
function resetBackgroundMarquee() {
  marquee = document.getElementById('background-marquee');
  marquee.innerHTML = '<marquee behavior="slide" direction="right" scrollamount="30"><h2>My background</h2></marquee>';
}

function resetStoryMarquee() {
  marquee = document.getElementById('story-marquee');
  marquee.innerHTML = '<marquee behavior="slide" direction="left" scrollamount="40"><h2>The Story So Far</h2></marquee>';
}

function resetPresentMarquee() {
  marquee = document.getElementById('present-marquee');
  marquee.innerHTML = '<marquee behavior="slide" direction="right" scrollamount="40"><h2>At Present</h2></marquee>';
}

function resetInterestsMarquee() {
  marquee = document.getElementById('interests-marquee');
  marquee.innerHTML = '<marquee behavior="slide" direction="left" scrollamount="40"><h2>Interests</h2></marquee>';
}

// Html for summary section
const summaryHTML =
  `<br> <br><br>
  <h1>Hola <span id="wave">👋🏼</span> I'm Juan.</h1>
  <h1>Thank you for visiting</h1>
  <h1>the House of Juagarca</h1>
  <br>
  <p>A software house with a different perspective  👀</p>
  <div class="navigation-button-container" style="margin-left: 488px;">
    <i class="fas fa-arrow-right navigation-button" id="start" style=""onClick="resetBackgroundMarquee();"></i>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br> <br><br>
  <div id="background"></div>
  <br><br><br><br>
  <div style="display: flex;">
    <div style="width: 75%;">
    </div>
    <div>
      <div id="background-marquee" class="marquee"><h2 style="text-align:right;">My background</h2></div>
      <p style="text-align: right;">I was born in Valencia 🇪🇸 where I completed a BSc in Software Engineering</p>
      <p style="text-align: right;">Upon completion of my degree, I decided to move to London where I have been living and working for over a decade 😱</p>
      <p style="text-align: right; font-size: 16px; color: white;">I ❤️ this city and consider it my home</p>
    </div>
  </div>
  <div class="navigation-button-container">
    <i style="margin-left: 256px;" class="fas fa-arrow-right navigation-button" id="next-story"></i>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br> <br><br> <br><br>
  <div id="story"></div>
  <br> <br>
  <div style="display: flex;">
    <div style="width: 424px;">
      <br> <br>
      <div id="story-marquee" class="marquee"><h2>The Story So Far</h2></div>
      <p>When I moved to London I found difficult to find a Dev role 🧑🏻‍💻</p>
      <p style="color: white; font-size: 16px;">I ended up securing a job in a well known retailer and decided to take it as I needed to start earning 💰</p>
      <p>Since that point, I gained experience in different roles and industries. However, something has always been missing.</p>
      <p>Full details of my experience can be found on my <mark><a target="_blank" href="https://www.linkedin.com/in/juagarca">LinkedIn</a></mark> or <mark><a target="_blank" href="https://drive.google.com/file/d/1H6HaIIZTF3muL4cZXoXDlEiMqOmLSRoE/view?usp=sharing">CV</a></mark></p>
      <p style="color: white; font-size: 16px;">Retail | Events | Experiential Marketing | Recruitment</p>
    </div>
    <div style="text-align: right; width: 33%;" class="navigation-button-container">
      <i id="next-present" class="fas fa-arrow-right navigation-button" onClick="resetPresentMarquee();"></i>
    </div>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br><br><br><br>
  <div id="present"></div>
  <br><br>
  <div style="display: flex;" >
    <div>
      <div id="present-marquee" class="marquee"><h2 style="text-align:right;">At Present</h2></div>
      <p style="text-align: right;">I have restarted my tech career 🙌🏼 and this is how the House of Juagarca was born!</p>
      <p style="text-align: right;">In 2020 I graduated from Le Wagon, the world's best coding bootcamp and it was one of the best experiences in my life 😃</p>
      <p style="color: white; font-size: 15px; text-align: right;">This is going to be a great year and along joining an awesome company, I will be working on my projects which I will be addding to the<i class="fas fa-tools button-summary" style="margin-right: 8px;"></i>section and<i class="fab fa-github button-summary"></i></p>
    </div>
    <div style="width: 62%;">
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <div class="navigation-button-container">
        <i id="next-interest" class="fas fa-arrow-right navigation-button" onClick="resetInterestsMarquee()";></i>
      </div>
    </div>
  </div>
  <br> <br> <br> <br> <br> <br> <br><br> <br><br><br> <br><br><br> <br><br><br><br><br><br><br><br>
  <div style="display: flex;" id="interests">
    <div>
      <div id="interests-marquee" class="marquee"><h2>Interests</h2></div>
      <p>The idea behind this project was to create an app where I could showcase both my portfolio and personal interests 🤷🏻‍♂️</p>
      <p>I'm obsessed with music & pop culture, here's a sneak peak to what I'm listening to. Need the full playlist? 😛 go ahead and visit my <mark><a target="_blank" href="https://www.last.fm/user/Darin86">last.fm</a></mark></p>
      <p style="color: white; font-size: 16px;">I try to go on holidays as much as I can, shocking right? I thought I'd share with you some of my favourite destinations</p>
    </div>
    <div style="width: 60%;"></div>
  </div>`;

//Populate summary by default
const summary = document.querySelector('.summary');
setTimeout(function(){ summary.insertAdjacentHTML('beforeend', summaryHTML); }, 900);
setTimeout(function(){ summary.classList.add('show'); }, 900);
setTimeout(buttonsTransition, 900);
setTimeout(scrollToTop, 900);

// Summary buttons transitions
function buttonsTransition() {
  document.getElementById('start').addEventListener('click', (event) => {
    event.currentTarget.classList.add('rotate');
    setTimeout(function() {
      document.getElementById('background').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      resetBackgroundMarquee();
    }, 300);
  });

  document.getElementById('next-story').addEventListener('click', () => {
    event.currentTarget.classList.add('rotate');
    setTimeout(function() {
      document.getElementById('story').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      resetStoryMarquee();
    }, 300);
  });

  document.getElementById('next-present').addEventListener('click', () => {
    event.currentTarget.classList.add('rotate');
    setTimeout(function() {
      document.getElementById('present').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      resetPresentMarquee();
    }, 300);
  });

  document.getElementById('next-interest').addEventListener('click', () => {
    event.currentTarget.classList.add('rotate');
    setTimeout(function() {
      document.getElementById('interests').scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
      resetInterestsMarquee();
    }, 300);
  });
}

// Html for projects section
const projectsHTML =
  `<h2>Projects</h2>
  <div class="project-container" id="pintpal-container">
    <div id="pintpal" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/pintpal.png');">
      <h2>PintPal</h2>
    </div>
  </div>
  <div class="project-container" id="hiremyhound-container">
    <div id="hiremyhound" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/hiremyhound.png');">
      <h2>HireMyHound</h2>
    </div>
  </div>
  <div class="project-container" id="chat-container">
    <div id="chat" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/chat.png');">
      <h2>Chat</h2>
    </div>
  </div>
  <div class="project-container" id="garage-container">
    <div id="garage" class="show-card card-project" style="cursor: pointer; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/Garage/garage02.png');">
      <h2>Garage</h2>
    </div>
  </div>`;

const projects = document.querySelector(".cards-projects");


//Delete project cards and add PintPal Project
function deleteProjectCardsAndAddPintPal() {
  document.getElementById('pintpal-project').classList.add("show-project");
  scrollToTop();
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
        <!-- The Modal -->
        <div id="myModal" class="modal">
          <!-- The Close Button -->
          <span class="close">&times;</span>
          <!-- Modal Content (The Image) -->
          <img class="modal-content-pintpal" id="img01">
        </div>
        <img src="images/PintPal/pintpal01.png" class="pintpal-image myImg">
        <img src="images/PintPal/pintpal02.png" class="pintpal-image myImg">
        <img src="images/PintPal/pintpal03.png" class="pintpal-image myImg">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Description</h3>
      <p style="text-align: right;">PintPal was created during my time at Le Wagon with 3 friends 🙋🏼‍♀️🙋🏼‍♂️🙋🏻‍♂️🙋🏽‍♂️</p>
      <p style="text-align: right;">The app includes an interactive map of London venues offering outdoor space & heating 🔥 You are also able to book a venue to meet your friends and have a live conversation 💬 with the venue staff in case you are delayed for your reservation and would like to keep your table.</p>
      <p style="text-align: right;">After your visit, your receive a notification to remind you to review your visit 🚀</p>
      <p style="text-align: right;">This app was created in only 9 days, cheers! 🍻 </p>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Tools</h3>
      <div class="project-tools">
        <img src="images/html.svg" alt="HTML" title="HTML">
        <img src="images/css.svg" alt="CSS" title="CSS">
        <img src="images/sass.svg" alt="SASS" title="SASS">
        <img src="images/javascript.svg" alt="JavaScript" title="JavaScript">
        <img src="images/ajax.svg" alt="AJAX" title="AJAX">
        <img src="images/ruby.svg" alt="Ruby" title="Ruby">
        <img src="images/rails.svg" alt="Rails" title="Rails">
        <img src="images/postgresql.svg" alt="PostgreSQL" title="PostgreSQL">
        <img src="images/github.svg" alt="Github" title="Github">
        <img src="images/git.svg" alt="Git" title="Git">
        <img src="images/heroku.svg" alt="Heroku" title="Heroku">
        <img src="images/figma.svg" alt="Figma" title="Figma">
        <img src="images/illustrator.svg" alt="Adobe Illustrator" title="Adobe Illustrator">
        <img src="images/slack.svg" alt="Slack" title="Slack">
        <img src="images/trello.svg" alt="Trello" title="Trello">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Links</h3>
      <p style="text-align: right;"><mark><a href="https://www.pintpal.me" target="_blank">Website</a></mark></p>
      <p style="text-align: right;"><mark><a href="https://github.com/odealtry/PintPal" target="_blank">Repo on github</a></mark></p>
    </div>`;

  projects.insertAdjacentHTML('beforeEnd', pintPalHTML);
  setTimeout(deleteProjectCardsAndAddPintPal, 0);
  scrollToTop();

  // Get the modals
  const modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const images = document.querySelectorAll(".myImg");
  const modalImg = document.getElementById("img01");
  images.forEach((img) => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    }
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

//Delete project cards and add HireMyHound Project
function deleteProjectCardsAndAddHireMyHound() {
  document.getElementById('hiremyhound-project').classList.add("show-project");
  scrollToTop();
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
      <!-- The Modal -->
      <div id="myModal" class="modal">
        <!-- The Close Button -->
        <span class="close">&times;</span>
        <!-- Modal Content (The Image) -->
        <img class="modal-content" id="img01">
      </div>
      <img src="images/HireMyHound/hiremyhound01.png" class="hiremyhound-image myImg">
      <img src="images/HireMyHound/hiremyhound02.png" class="hiremyhound-image myImg">
      <img src="images/HireMyHound/hiremyhound03.png" class="hiremyhound-image myImg">
      <img src="images/HireMyHound/hiremyhound04.png" class="hiremyhound-image myImg">
    </div>
    <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Description</h3>
    <p style="text-align: right;">HireMyHound is an Airbnb clone created at Le Wagon with 3 friends 🙋🏼‍♀️🙋🏼‍♂️🙋🏻‍♂️🙋🏽‍♂️</p>
    <p style="text-align: right;">The app includes a search function and an interactive map of dogs available for hire. Dogs and dog owners have profile pages where they display all their details and rates 💰</p>
    <p style="text-align: right;">As a visitor you can read the blog and explore the 🐶 in your area, but if you wish to book one of the gorgeous pups you will need to create an account.</p>
    <p style="text-align: right;">This app was created in only 4 days</p>
    <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Tools</h3>
    <div class="project-tools">
      <img src="images/html.svg" alt="HTML" title="HTML">
      <img src="images/css.svg" alt="CSS" title="CSS">
      <img src="images/sass.svg" alt="SASS" title="SASS">
      <img src="images/javascript.svg" alt="JavaScript" title="JavaScript">
      <img src="images/ruby.svg" alt="Ruby" title="Ruby">
      <img src="images/rails.svg" alt="Rails" title="Rails">
      <img src="images/postgresql.svg" alt="PostgreSQL" title="PostgreSQL">
      <img src="images/github.svg" alt="Github" title="Github">
      <img src="images/git.svg" alt="Git" title="Git">
      <img src="images/heroku.svg" alt="Heroku" title="Heroku">
      <img src="images/figma.svg" alt="Figma" title="Figma">
      <img src="images/illustrator.svg" alt="Adobe Illustrator" title="Adobe Illustrator">
      <img src="images/slack.svg" alt="Slack" title="Slack">
      <img src="images/trello.svg" alt="Trello" title="Trello">
    </div>
    <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Links</h3>
    <p style="text-align: right; color:"><mark><a href="https://hiremyhound.herokuapp.com" target="_blank">Website</a></mark></p>
    <p style="text-align: right;"><mark><a href="https://github.com/juagarca/hire-my-hound" target="_blank">Repo on github</a></mark></p>
  </div>`;

  projects.insertAdjacentHTML('beforeEnd', hireMyHoundHTML);
  setTimeout(deleteProjectCardsAndAddHireMyHound, 0);

  // Get the modals
  const modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const images = document.querySelectorAll(".myImg");
  const modalImg = document.getElementById("img01");
  images.forEach((img) => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    }
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

//Delete project cards and add Chat Project
function deleteProjectCardsAndAddChat() {
  document.getElementById('chat-project').classList.add("show-project");
  scrollToTop();
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
        <!-- The Modal -->
        <div id="myModal" class="modal">
          <!-- The Close Button -->
          <span class="close">&times;</span>
          <!-- Modal Content (The Image) -->
          <img class="modal-content" id="img01">
        </div>
        <img src="images/Chat/chat01.png" class="chat-image myImg">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Description</h3>
      <p style="text-align: right;">This is a live chat 💬 application which I created with React & Redux and is protected 🔒by a Devise sign in.</p>
      <p style="text-align: right;">I also had to provide an API for the front-end, as Redux action creators needed to retrieve information from Rails.</p>
      <p style="text-align: right;">This is my first React & Rails application 🙌🏼 and it was so exciting to see how everything connects together.
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Tools</h3>
      <div class="project-tools">
        <img src="images/html.svg" alt="HTML" title="HTML">
        <img src="images/css.svg" alt="CSS" title="CSS">
        <img src="images/javascript.svg" alt="JavaScript" title="JavaScript">
        <img src="images/react.svg" alt="React" title="React">
        <img src="images/redux.svg" alt="Redux" title="Redux">
        <img src="images/ajax.svg" alt="AJAX" title="AJAX">
        <img src="images/ruby.svg" alt="Ruby" title="Ruby">
        <img src="images/rails.svg" alt="Rails" title="Rails">
        <img src="images/postgresql.svg" alt="PostgreSQL" title="PostgreSQL">
        <img src="images/github.svg" alt="Github" title="Github">
        <img src="images/git.svg" alt="Git" title="Git">
        <img src="images/heroku.svg" alt="Heroku" title="Heroku">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Links</h3>
      <p style="text-align: right; color:"><mark><a href="https://chatrailsredux.herokuapp.com" target="_blank">Website</a></mark></p>
      <p style="text-align: right;"><mark><a href="https://github.com/juagarca/chat-rails-redux" target="_blank">Repo on github</a></mark></p>
    </div>`;

  projects.insertAdjacentHTML('beforeEnd', chatHTML);
  setTimeout(deleteProjectCardsAndAddChat, 0);
  scrollToTop();

  // Get the modals
  const modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const images = document.querySelectorAll(".myImg");
  const modalImg = document.getElementById("img01");
  images.forEach((img) => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    }
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
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
        <img src="images/Garage/garage01.png" class="garage-image myImg">
        <img src="images/Garage/garage02.png" class="garage-image myImg">
      </div>
      <img src="images/Garage/garage03.png" class="garage-image myImg" style="margin-top: 16px;">
      <!-- The Modal -->
      <div id="myModal" class="modal">
        <!-- The Close Button -->
        <span class="close">&times;</span>
        <!-- Modal Content (The Image) -->
        <img class="modal-content" id="img01">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Description</h3>
      <p style="text-align: right;">This little garage application was my first React application using Router 💪🏼</p>
      <p style="text-align: right;">The purpose was to create a SPA to keep track of the cars 🚘 entering the garage. Basically, a little CRUD app backed by a REST API. </p>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Tools</h3>
      <div class="project-tools">
        <img src="images/html.svg" alt="HTML" title="HTML">
        <img src="images/css.svg" alt="CSS" title="CSS">
        <img src="images/javascript.svg" alt="JavaScript" title="JavaScript">
        <img src="images/react.svg" alt="React" title="React">
        <img src="images/redux.svg" alt="Redux" title="Redux">
        <img src="images/ajax.svg" alt="AJAX" title="AJAX">
        <img src="images/github.svg" alt="Github" title="Github">
        <img src="images/git.svg" alt="Git" title="Git">
      </div>
      <h3 style="text-align: right; font-size: 18px; font-weight: bolder; margin-top: 48px;">Links</h3>
      <p style="text-align: right;"><mark><a href="https://github.com/juagarca/garage-redux" target="_blank">Repo on github</a></mark></p>

    </div>`;

  projects.insertAdjacentHTML('beforeEnd', garageHTML);
  setTimeout(deleteProjectCardsAndAddGarage, 0);
  scrollToTop();

  // Get the modals
  const modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const images = document.querySelectorAll(".myImg");
  const modalImg = document.getElementById("img01");
  images.forEach((img) => {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
    }
  });

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

//click event for home button
const homeBtn = document.querySelector('.fa-home')
homeBtn.addEventListener('click', (event) => {
  scrollToTop();
  const summary = document.querySelector('.summary');
  summary.innerHTML = "";
  setTimeout(function(){ summary.insertAdjacentHTML('beforeend', summaryHTML); }, 400);
  setTimeout(function(){ summary.classList.add('show'); }, 400);
  setTimeout(buttonsTransition, 400);

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

// Setting up click events for cards
function clickEventsForProjectCards() {
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
}

//Click event for project buttons
projectBtns = document.querySelectorAll('.fa-tools');
projectBtns.forEach((projectBtn) => {
  projectBtn.addEventListener('click', (event) => {
    // Scroll to top
    scrollToTop();

    const summary = document.querySelector('.summary');
    if (summary.classList.contains('show')) {
      summary.classList.remove('show')
    }
    summary.innerHTML = "";

    if (projects.classList.contains('show')) {
      projects.classList.remove('show');
    }
    projects.innerHTML = "";
    setTimeout(function(){ projects.insertAdjacentHTML('beforeend', projectsHTML); }, 300);
    setTimeout(function(){ projects.classList.add('show'); }, 300);

    const cv = document.querySelector('.cv-container');
    if (cv.classList.contains('show')) {
      cv.classList.remove('show')
    }
    cv.innerHTML = "";

    // Setting up click events for cards
    setTimeout(clickEventsForProjectCards, 300);
  });
});

const cvHTML =
  `<h2>CV</h2>
  <a href="https://drive.google.com/file/d/1H6HaIIZTF3muL4cZXoXDlEiMqOmLSRoE/view?usp=sharing" target="_blank" style="display: flex; height: 65vh; justify-content: space-between; margin-top: 40px;">
    <img class="cv" src="images/CV-1.png" alt="CV" width="280" height="390" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
    <img class="cv" src="images/CV-2.png" alt="CV" width="280" height="390" style="border: 1px solid rgba(255, 255, 255, 0.2);" title="Click to download!">
  </a>`;


//click event for cv button
const cvButton = document.querySelector('.fa-file-code')
cvButton.addEventListener('click', (event) => {
  scrollToTop();

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
  setTimeout(function(){ cv.insertAdjacentHTML('beforeend', cvHTML); }, 400);
  setTimeout(function(){ cv.classList.add('show'); }, 400);
});

// Function calls
fetchSongs();
setTimeout(deleteLoading, 900);
setInterval(fetchSong, 30000);
cities.forEach((city) => {
  fetchWeather(city);
});


