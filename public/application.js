const apiKey = '9003b582cac1084f57538941e2c6ba19';
const cities = ["Tel Aviv", "New York", "Mykonos", "London", "San Francisco", "Los Angeles", "Berlin", "Valencia"];

const buildHTML = (city, weather, description, iconUrl, temp) => {
  city = `<div class="city-card">
                <div class="city-image" style='background-image: url(${iconUrl});'></div>
                <div class="citi-info"
                     style="display: flex;
                            flex-direction: column;
                            justify-content: center;">
                  <p>${city}</p>
                  <p><em>${Math.round(temp)}°C<em></p>
                </div>
          </div>`;
  document.querySelector(".weather-card-content").insertAdjacentHTML('beforeEnd', city);
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
