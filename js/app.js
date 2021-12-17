let temperature = document.getElementById("temperature");
let nameCity = document.getElementById("nameCity");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let tempMin = document.getElementById("temp-min");
let tempMax = document.getElementById("temp-max");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let image = document.getElementById("image");
let container = document.getElementById("container");
let date = document.getElementById("date");
const valid = document.getElementById("valid");

container.style.height = innerHeight + "px";

setInterval(()=>date.innerHTML = new Date().toLocaleTimeString(),1000);//date

valid.addEventListener("click", () => {
    let city = document.getElementById("city").value;

    let requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
        "&units=metric&lang=fr&appid=7108c015dafb99b66a4d4a77251c1ff1";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL);
    xhr.responseType = "json";

    /**
     * server response
     */
    xhr.onload = function () {
        if(xhr.status !== 200) {
            return;
        }
        let response = xhr.response;

        switch (response.weather[0].description) {
            case "ciel dégagé" :
                image.style.backgroundImage = "url('../img/cielDegage.png')";
                break;
            case "couvert" :
                image.style.backgroundImage = "url('../img/couvert.png')";
                break;
            case "légères chutes de neige" :
                image.style.backgroundImage = "url('../img/chutesDeNeige.png')";
                break;
            case "légère pluie" :
                image.style.backgroundImage = "url('../img/légèrePluie.png')";
                break;

        }
        nameCity.innerHTML = "<br>" + city + "<br>";
        temperature.innerHTML = Math.ceil(response.main.temp) + "°C" + "<br>";
        description.innerHTML = response.weather[0].description + "<br>";
        humidity.innerHTML = "Humidité: " + Math.ceil(response.main.humidity) + "%" + "<br>";
        tempMin.innerHTML = "Température min : " + Math.ceil(response.main.temp_min) + "°C" + "<br>";
        tempMax.innerHTML = "Temperature max : " + Math.ceil(response.main.temp_max) + "°C" + "<br>";

        let date = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
        sunrise.innerHTML = "Lever du soleil : " + date +  "<br>";

        date = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        sunset.innerHTML = "Coucher du soleil : " + date ;
    }
    xhr.send();
})
