//recup html
let description = $("#description");
let humidity = $("#humidity");
let tempMin = $("#temp-min");
let tempMax = $("#temp-max");
let sunrise = $("#sunrise");
let sunset = $("#sunset");
let date = $("#date");
let valid = $("#valid");
let image = $("#image");
let nameCity = $("#nameCity");
let temperature = $("#temperature");
$("#container").css("height", innerHeight + "px");

//recover the current time
setInterval(()=>date.innerHTML = new Date().toLocaleTimeString(),1000);//date

//response api
valid.on("click", () => {
    let city = $("#city").val();
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
        "&units=metric&lang=fr&appid=7108c015dafb99b66a4d4a77251c1ff1";
    $.getJSON(url, function (response) {
        $("#nameCity").first().html(JSON.stringify(response.city));

        // image as a function of time
        switch (response.weather[0].description) {
            case "ciel dégagé" :
                image.css( {
                    "backgroundImage" : "url('img/cielDegage.png')",
                    "backgroundSize": "cover"
                })
                break;
            case "couvert" :
                image.css( {
                    "backgroundImage": "url('img/couvert.png')",
                    "backgroundSize" : "cover"
                })
                break;
            case "légères chutes de neige" :
                image.css( {
                    "backgroundImage" : "url('img/chutesDeNeige.png')",
                    "backgroundSize" : "cover"
                })
                break;
            case "légère pluie" :
                image.css( {
                    "backgroundImage" : "url('img/légèrePluie.png')",
                    "backgroundSize" : "cover"
                })
                break;

        }
        nameCity.html("<br>" + city + "<br>").css("fontSize" , "4rem");
        temperature.html(Math.ceil(response.main.temp) + "°C" + "<br>");
        description.html(response.weather[0].description + "<br>");
        humidity.html("Humidité:" + Math.ceil(response.main.humidity) + "%" + "<br>");
        tempMin.html("Température min: " + Math.ceil(response.main.temp_min) + "°C" + "<br>");
        tempMax.html("Temperature max : " + Math.ceil(response.main.temp_max) + "°C" + "<br>");

        let date = new Date(response.sys.sunrise * 1000).toLocaleTimeString();
        sunrise.html("Lever du soleil : " + date +  "<br>");

        date = new Date(response.sys.sunset * 1000).toLocaleTimeString();
        sunset.html("Coucher du soleil : " + date );
    })
})



