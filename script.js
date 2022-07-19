const url = 'https://api.openweathermap.org/data/2.5/';
const key = '';

const setQuery = (e) => {
    if (e.keyCode == '13') {
        getResultDaily(searchBar.value);
    }
}

const getResultDaily = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric`;
    fetch(query)
        .then(weather => {
            return weather.json();
        })
        .then(displayResult)

    let query2 = `${url}forecast?q=${cityName}&appid=${key}&units=metric`;
    fetch(query2)
        .then(weather => {
            return weather.json();
        })
        .then(displayResult2)
}

const displayResult = (result) => {
    if (result.message == "city not found") {
        let days = document.querySelector("#right-info");
        days.innerText = `Please enter a valid city name!`;
        return;
    }

    let city = document.querySelector("#cityname");
    city.innerText = `${result.name}, ${result.sys.country}`

    let temp = document.querySelector("#temperature");
    temp.innerText = `${Math.round(result.main.temp)}°C`

    let maxmintemp = document.querySelector("#maxmintemp");
    maxmintemp.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`

    let feels = document.querySelector("#feels");
    feels.innerText = `Feels like ${Math.round(result.main.feels_like)}°C`

    let desc = document.querySelector("#description");
    desc.innerText = capitalize(result.weather[0].description);

    let pre = document.querySelector("#pressure");
    pre.innerText = `Pressure ${result.main.pressure} hPa`;

    let humid = document.querySelector("#humidity");
    humid.innerText = `Humidity %${result.main.humidity}`;

    let bg = document.querySelector("body");
    let icon = document.querySelector("#icon");
    switch (result.weather[0].main) {
        case "Clouds":
            icon.src = "pics\\cloud.png";
            document.body.style.backgroundImage = "url('pics/cloudy-bg.jpg')";
            break;
        case "Thunderstorm":
            icon.src = "pics\\storm.png";
            document.body.style.backgroundImage = "url('pics/stormy-bg.jpg')";
            break;
        case "Drizzle":
            icon.src = "pics\\cloudy.png";
            document.body.style.backgroundImage = "url('pics/rainy-bg.jpg')";
            break;
        case "Rain":
            icon.src = "pics\\rainy.png";
            document.body.style.backgroundImage = "url('pics/rainy-bg.jpg')";
            break;
        case "Snow":
            icon.src = "pics\\snow.png";
            document.body.style.backgroundImage = "url('pics/snowy-bg.jpg')";
            break;
        case "Clear":
            icon.src = "pics\\sun.png";
            document.body.style.backgroundImage = "url('pics/sunny-bg.jpg')";
            break;
    }
}

const displayResult2 = (result) => {
    console.log(result);
    let days = document.querySelector("#right-info");
    days.innerText = `Next 5 Days`;

    let icon1 = document.querySelector("#day1icon");
    let icon2 = document.querySelector("#day2icon");
    let icon3 = document.querySelector("#day3icon");
    let icon4 = document.querySelector("#day4icon");
    let icon5 = document.querySelector("#day5icon");

    let temp1 = document.querySelector("#day1temp");
    let temp2 = document.querySelector("#day2temp");
    let temp3 = document.querySelector("#day3temp");
    let temp4 = document.querySelector("#day4temp");
    let temp5 = document.querySelector("#day5temp");

    let info1 = document.querySelector("#day1info");
    let info2 = document.querySelector("#day2info");
    let info3 = document.querySelector("#day3info");
    let info4 = document.querySelector("#day4info");
    let info5 = document.querySelector("#day5info");

    let date1 = document.querySelector("#date1");
    let date2 = document.querySelector("#date2");
    let date3 = document.querySelector("#date3");
    let date4 = document.querySelector("#date4");
    let date5 = document.querySelector("#date5");

    let iconArr = [icon1, icon2, icon3, icon4, icon5];
    let tempArr = [temp1, temp2, temp3, temp4, temp5];
    let infoArr = [info1, info2, info3, info4, info5];
    let dateArr = [date1, date2, date3, date4, date5];
    let index = 1;

    for (let i = 0; i < 5; i++) {
        let datetime = result.list[index].dt_txt.split(" ")[0];
        let date = datetime.split("-")[2] + "." + datetime.split("-")[1];
        dateArr[i].innerText = date;

        switch (result.list[index].weather[0].main) {
            case "Clouds":
                iconArr[i].src = "pics\\cloud.png";
                break;
            case "Thunderstorm":
                iconArr[i].src = "pics\\storm.png";
                break;
            case "Drizzle":
                iconArr[i].src = "pics\\cloudy.png";
                break;
            case "Rain":
                iconArr[i].src = "pics\\rainy.png";
                break;
            case "Snow":
                iconArr[i].src = "pics\\snow.png";
                break;
            case "Clear":
                iconArr[i].src = "pics\\sun.png";
                break;
        }
        tempArr[i].innerText = `${Math.round(result.list[index].main.temp)}°C`;
        infoArr[i].innerText = `${capitalize(result.list[index].weather[0].description)}`

        index += 8;
        if (index == 40) index = 39;
    }
}

function capitalize(str) {
    let splitted = str.split(" ");
    let ret = "";
    for (let i = 0; i < splitted.length; i++) {
        splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
        ret += splitted[i] + " ";
    }
    return ret;
}

const searchBar = document.getElementById('searchbar');
searchBar.addEventListener('keypress', setQuery);
const button = document.getElementById('searchbutton');
button.onclick = function () {
    getResultDaily(searchBar.value);
}