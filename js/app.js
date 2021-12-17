const city = document.getElementById("city").value;
const valid = document.getElementById("valid");

valid.addEventListener("click", () => {
    const requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7108c015dafb99b66a4d4a77251c1ff1";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL);
    xhr.responseType = "json";

    xhr.onload = function () {
        if(xhr.status !== 200) {
            return;
        }
        let response = xhr.response;
    }
})
