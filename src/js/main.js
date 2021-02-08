import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '.././css/styles.css';

$(document).ready(function() {
  $('.btn').click(function() {
    const city = $('#location').val();
    const zip = $('#zip').val();
    const country = $('#countryCode').val();
    $('#location, #zip, #countryCode').val("");

    let request = new XMLHttpRequest();
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    const url2 = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${process.env.API_KEY}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", ($(this).attr('id') === 'weatherLocation') ? url1 : url2, true);
    request.send();

    function getElements(response) {
      $('.showHumidity').text(`The humidity for ${zip}${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      $('.description').text(`The clouds are: ${response.weather[0].description}`);
    }
  });
});