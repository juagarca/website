const apiKey = '9003b582cac1084f57538941e2c6ba19';
const cities = ["London", "Valencia", "Tel Aviv", "Mykonos", "New York", "San Francisco", "Los Angeles", "Berlin"];

const buildHTML = (city, weather, description, iconUrl, temp) => {
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

const fetchInfo = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const weather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
      buildHTML(city, weather, description, iconUrl, temp);
    });
};

cities.forEach((city) => {
  fetchInfo(city);
});
