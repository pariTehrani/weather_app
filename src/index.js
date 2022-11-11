let temperature = document.querySelector(".temperature");
let celsiusTemp = document.querySelector("#celsiusTemp");
let fahrenheitTemp = document.querySelector("#fahrenheitTemp");
let date = document.querySelector("#date");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let searchContent = document.querySelector("#searchContent");
let currentDate = new Date();
let day_time = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit"
});
date.innerHTML = day_time;
if (searchContent.value.length < 1) {
  let apiKey = "9d5e9ae00531cc47a1afce47e2f9473b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=zanjan&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.name;
  });
}

let cityName = document.querySelector(".cityName");
let formSearch = document.querySelector("#formSearch");
formSearch.addEventListener("submit", showSearch);
function showSearch(event) {
  event.preventDefault();
  //cityName.innerHTML = searchContent.value;
  let apiKey = "9d5e9ae00531cc47a1afce47e2f9473b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchContent.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then((response) => {
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = Math.round(response.data.main.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.name;
  });
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showIt);

  function showIt(position) {
    let latitude = position.coords.latitude;
    console.log(latitude);

    let longitude = position.coords.longitude;
    console.log(longitude);

    let apiKey = "9d5e9ae00531cc47a1afce47e2f9473b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      temperature.innerHTML = Math.round(response.data.main.temp);
      humidity.innerHTML = Math.round(response.data.main.humidity);
      wind.innerHTML = Math.round(response.data.wind.speed);
      cityName.innerHTML = response.data.name;
    });
  }
});
