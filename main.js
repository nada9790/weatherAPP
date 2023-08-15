let todayName = document.getElementById("todayDateDayName");
let todayNumber = document.getElementById("todayDateDayNumber");
let todayMonth = document.getElementById("todayDateMonthName");
let todayLocation = document.getElementById("todayLocation");
let temp=document.getElementById("Temp")
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection");
// next day 
let nextDayName = document.getElementsByClassName("nextDayName");
let nextDateNumber = document.getElementsByClassName("nextDateNumber");
let nextDateMonth = document.getElementsByClassName("nextDateMonth");
let nextMaxTemp = document.getElementsByClassName("nextMaxTemp");
let nextMinTemp = document.getElementsByClassName("nextMinTemp");
let nextConditionImg= document.getElementsByClassName("nextConditionImg")
let nextDescriptionText = document.getElementsByClassName("nextDescriptionText");
let nextHumidity=document.getElementsByClassName("nextHumidity")
let nextWind = document.getElementsByClassName("nextWind");
let dailyChanceOfRain = document.getElementsByClassName("dailyChanceOfRain");

// search
let searchInput = document.getElementById("search");

async function getWeatherData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ced9c814a36f4331a34233456230108&q=${cityName}&days=3`);
  
  let weatherData = await weatherResponse.json();
  return weatherData
  
};
;
// display Today Data
function displayTodayData(data) {
  
  let todayDate = new Date()
  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {weekday: "long", });
  todayNumber.innerHTML = todayDate.getDate()
  todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", {month: "long",});
  todayLocation.innerHTML = data.location.name;
  temp.innerHTML = data.current.temp_c
  todayConditionImg.setAttribute("src",data.current.condition.icon)
  todayConditionText.innerHTML = data.current.condition.text
  humidity.innerHTML = data.current.humidity + "%"
  wind.innerHTML = data.current.wind_kph + "km/h"
  windDirection.innerHTML = data.current.wind_dir
  
}


// display Next Day Data
function displayNextDayData(data) {
  let forecastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++){
    let nextDate = new Date(forecastData[i + 1].date)
    nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", {weekday: "long",});
    nextDateNumber[i].innerHTML = nextDate.getDate();
    nextDateMonth[i].innerHTML =  nextDate.toLocaleDateString("en-US", { month: "long",});
    nextMaxTemp[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forecastData[i + 1].day.mintemp_c;
    nextConditionImg[i].setAttribute("src", forecastData[i + 1].day.condition.icon);
    nextDescriptionText[i].innerHTML = forecastData[i + 1].day.condition.text;
    nextHumidity[i].innerHTML = forecastData[i + 1].day.avghumidity + "%"
    nextWind[i].innerHTML = forecastData[i + 1].day.maxwind_kph + "km/h"
    dailyChanceOfRain[i].innerHTML =forecastData[i + 1].day.daily_chance_of_rain + "%";
    
   }
 }






async function startApp(city="london") {
  let weatherData = await getWeatherData(city)
  displayTodayData(weatherData)
  displayNextDayData(weatherData);
  
}
startApp()

searchInput.addEventListener("input", function () {
 startApp(searchInput.value);
 });