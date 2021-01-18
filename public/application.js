const apiKey = '9003b582cac1084f57538941e2c6ba19';
const cities = ["London", "Mykonos", "Gran Canaria", "Berlin", "Tel Aviv", "New York", "San Francisco", "Los Angeles"];

const buildHTML = (city, weather, description, iconUrl, temp) => {
  document.querySelector(".main").insertAdjacentHTML('beforeend', `<p>${city}</p>`);
  document.querySelector(".main").insertAdjacentHTML('beforeend', `<img src=${iconUrl} alt="weather">`);
  document.querySelector(".main").insertAdjacentHTML('beforeend', `<p><strong>${Math.round(temp)}°C</strong></p>`);
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

