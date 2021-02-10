export default class WeatherService {
  static getWeather(city) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok)
          throw Error(response.statusText);
        else return response.json();
      })
      .catch(function(error) {
        return error;
      });
  }
}