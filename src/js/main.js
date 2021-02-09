import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././css/styles.css';

$(document).ready(function() {
  $('.btn').click(function() {
    const city = $("#location").val();
    const zip = $("#zip").val();
    const country = $("#countryCode").val();
    $("#location, #zip, #countryCode").val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${process.env.API_KEY}`;

      request.onload = function() {
        (this.status === 200) ? resolve(request.response): reject(request.response);
      };
      request.open("GET", $(this).attr("id") === "weatherLocation" ? url1 : url2, true);
      request.send();
    });
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity for ${zip}${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
      $('.description').text(`The clouds are: ${body.weather[0].description}`);
      $('.showErrors').text('');
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity, .showTemp, .description').text('');
    });
  });
});