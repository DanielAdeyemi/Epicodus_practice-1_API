export default class WeatherService {
  static getWeather(city) {
    return new Promise(function(resolve, reject) { // don't forget this f return!!!
      let request = new XMLHttpRequest();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        (this.status === 200) ? resolve(request.response): reject(request.response);
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}