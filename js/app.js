let forecast = document.getElementById("forecast");
let weatherDay = document.getElementById("weather");
const valid = document.getElementById("valid");

valid.addEventListener("click", () => {
    let city = document.getElementById("city").value;

    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
        "&units=metric&lang=fr&appid=7108c015dafb99b66a4d4a77251c1ff1";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL);
    xhr.responseType = "json";

    xhr.onload = function () {
        if(xhr.status !== 200) {
            return;
        }
        let response = xhr.response;

        weatherDay.innerHTML += "<br>" + city + "<br>";
        weatherDay.innerHTML += "Température: " + Math.ceil(response.main.temp) + "°C" + "<br>";
        weatherDay.innerHTML += response.weather[0].description + "<br>";
        weatherDay.innerHTML += "Humidité: " + Math.ceil(response.main.humidity) + "%" + "<br>";
        weatherDay.innerHTML += "Température min : " + Math.ceil(response.main.temp_min) + "°C" + "<br>";
        weatherDay.innerHTML += "Temperature max : " + Math.ceil(response.main.temp_max) + "°C" + "<br>";

        let date = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
        weatherDay.innerHTML += "Lever du soleil : " + date +  "<br>";

        date = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        weatherDay.innerHTML += "Coucher du soleil : " + date ;

        forecast.innerHTML += response.forecast.time.from + date ;
        forecast.innerHTML += response.forecast.time.to + (date * 4);
    }
    xhr.send();
})
