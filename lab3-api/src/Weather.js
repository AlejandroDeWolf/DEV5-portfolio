export default class Weather {
  constructor(API_KEY) {
    this.apiKey = API_KEY;

    // check if timestamp is older than 10 minutes
    if (
      localStorage.getItem("weather") &&
      Date.now() - localStorage.getItem("timestamp") < 600000
    ) {
      const weatherData = JSON.parse(localStorage.getItem("weather"));
      this.displayWeather(weatherData);
      console.log("from local storage");
    } else {
      this.getLocation();
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getWeather(position) {
    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `http://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${lat},${lon}&aqi=no`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // save weather to local storage
        localStorage.setItem("weather", JSON.stringify(data));
        // save timestamp
        localStorage.setItem("timestamp", Date.now());
        this.displayWeather(data);
      });
  }

  displayWeather(data) {
    const temp = data.current.temp_c;
    document.querySelector(".temp").textContent = `${temp}°C`;

    const weather = data.current.condition.text;
    document.querySelector(".weather").textContent = weather;

    const icon = data.current.condition.icon;
    document.querySelector(".icon").src = icon;

    if (temp > 30) {
      this.getQuote("inspire");
    } else if (temp > 20) {
      this.getQuote("management");
    } else if (temp > 10) {
      this.getQuote("sports");
    } else if (temp > 0) {
      this.getQuote("love");
    }
  }

  // ------------------ QUOTE API ------------------

  getQuote(category) {
    const url = `https://api.quotable.io/random?tags=${category}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.displayQuote(data);
      });
  }

  displayQuote(data) {
    const quote = data.content;
    document.querySelector(".quote").textContent = `"${quote}"`;

    const author = data.author;
    document.querySelector(".author").textContent = `- ${author}`;
  }
}
