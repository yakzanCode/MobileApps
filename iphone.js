const apps = document.getElementsByClassName("apps");
const bottom = document.getElementById("bottom");
const screen = document.getElementById("Screen");
const wApp = document.getElementById('weather');
let Top = document.getElementById("Top");
let homeScreen = document.querySelector('#homescreen')
let weatherScreen = document.querySelector('#weatherr')

function showTime() {
    var date = new Date();
    var hrs = date.getHours();
    var min = date.getMinutes();

    if (hrs == 0) {
        hrs = 12;
    }
    if (hrs > 12) {
        hrs = hrs - 12;
    }
    hrs = (hrs < 10) ? "0" + hrs : hrs;
    min = (min < 10) ? "0" + min : min;

    var time = hrs + ":" + min;
    document.getElementById("Time").textContent = time;
    document.getElementById("Time").innerHTML = time;
    setTimeout(showTime, 1000);
}

function Calendar() {
    var day = new Date().toLocaleDateString('en-us', { weekday: "short" });
    var nm = new Date().toLocaleDateString('en-us', { day: "numeric" });
    document.getElementById("daynm").innerHTML = nm;
    document.getElementById("day").innerHTML = day;
}
showTime();
Calendar();
function hideApps(A) {
    screen.style.backgroundImage = A;
    homeScreen.style.display = 'none'
}
wApp.addEventListener('click', function () {
    hideApps("url(./assets/bluesky.jpg)");
    openWeatherApp();
});

function openWeatherApp() {
    weatherScreen.style.display = 'block'
}

let form = document.querySelector("#form")
form.addEventListener('submit', callApi)



async function callApi(e) {
    e.preventDefault()
    const City = document.getElementById('search').value
    let lat
    let long

    try {
        await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${City}&limit=5&appid=51f9b5b5a9d9152834d01908114fed1c`)
            .then(response => response.json())
            .then(json => {
                document.getElementById('city').innerHTML = json[0].name
                lat = json[0].lat;
                long = json[0].lon;
            })
        await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
            .then(response => response.json())
            .then(json => {
                document.getElementById('condition').innerHTML = codes(json.current_weather.weathercode)
                document.getElementById('temp').innerHTML = json.current_weather.temperature
                document.getElementById('gust').innerHTML = 'Wind speed is to ' + json.current_weather.windspeed + ' .'
                document.getElementById('search').value = ' '
            })
    } catch (error) {
        console.log(error)
    }
}

function codes(number) {
    if (number == 0) {
        return 'Clear sky'
    }
    if (number == 1 || number == 2 || number == 3) {
        return 'Mainly Clear'
    }
    if (number == 2) {
        return 'Partly Cloudy'
    }
    if (number == 3) {
        return 'Overcast'
    }

    if (number == 45) {
        return 'Fog'
    }
    if (number == 48) {
        return 'Depositing Rime Fog'
    }
    if (number == 51) {
        return 'Light Intensity Drizzle'
    }
    if (number == 53) {
        return 'Moderate Intensity Drizzle'
    }
    if (number == 55) {
        return 'Dense Intensity Drizzle'
    }
    if (number == 56) {
        return 'Light Intensity Freezing Drizzle'
    }
    if (number == 57) {
        return 'Heavy Intensity Freezing Drizzle'
    }
    if (number == 61) {
        return 'Slight Intensity Rain'
    }
    if (number == 63) {
        return 'Moderate Intensity Rain'
    }
    if (number == 65) {
        return 'Heavy Intensity Rain'
    }
    if (number == 66) {
        return 'Light Intensity Freezing Rain'
    }
    if (number == 67) {
        return 'Heavy Intensity Freezing Rain'
    }
    if (number == 71) {
        return 'Slight Intensity Snow Fall'
    }
    if (number == 73) {
        return 'Moderate Intensity Snow Fall'
    }
    if (number == 75) {
        return 'Heavy Intensity Snow Fall'
    }
    if (number == 77) {
        return 'Snow grains'
    }
    if (number == 80) {
        return 'Slight Rain Showers'
    }
    if (number == 81) {
        return 'Moderate Rain Showers'
    }
    if (number == 82) {
        return 'Violent Rain Showers'
    }
    if (number == 85) {
        return 'Slight Snow Showers'
    }
    if (number == 86) {
        return 'Heavy Snow Showers'
    }
    if (number == 95) {
        return 'Thunderstorm'
    }
    if (number == 96) {
        return 'Thunderstorm With Slight Hail'
    }
    if (number == 99) {
        return 'Thunderstorm With Heavy Hail'
    }
}

