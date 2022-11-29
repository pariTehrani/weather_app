let temperature = document.querySelector(".temperature");
let celsiusTemp = document.querySelector(".celsiusTemp");
let fahrenheitTemp = document.querySelector(".fahrenheitTemp");
let date = document.querySelector("#date");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let searchContent = document.querySelector("#searchContent");
let weatherDescription = document.querySelector("#weatherDescription");
let cityName = document.querySelector(".cityName");
let showForecast = document.querySelector("#showForecast");

let currentDate = new Date();
let day_time = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
});
date.innerHTML = day_time;
//default page when it loads
if (searchContent.value.length < 1) {
  console.log(1);
  let apiKey = "56cb6ef4c4t2co40cabe790e0e85623b";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=zanjan&appid=${apiKey}&units=metric`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=zanjan&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    temperature.innerHTML = Math.round(response.data.temperature.current);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.city;
    weatherDescription.innerHTML = response.data.condition.description;
    document.getElementById("imageId").src = response.data.condition.icon_url;
    console.log(response.data.condition.icon_url);

    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=zanjan&key=${apiKey}`;
    axios.get(forecastApiUrl).then((forecastResponse) => {
      console.log(forecastResponse.data);
      console.log(forecastResponse.data.daily);
      showForecast.innerHTML = "";

      for (let i = 1; i < 6; i++) {
        let forecastDate = forecastResponse.data.daily[i].time;
        forecastDate = new Date(forecastDate * 1000);
        let forecastDay = forecastDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        showForecast.innerHTML =
          showForecast.innerHTML +
          `<span class="mt-4 me-2 mb-3 ms-2 col-2"><ul><li>
              ${forecastDay}
            </li>
            <li>
              <img src="${
                forecastResponse.data.daily[i].condition.icon_url
              }" alt="" id="imageId">
            </li>
            <li>
              <span>${Math.round(
                forecastResponse.data.daily[i].temperature.minimum
              )}°</span>
              <span> ${Math.round(
                forecastResponse.data.daily[i].temperature.maximum
              )}° </span>
            </li>
          </ul>
        </span>`;
        console.log(i);
      }
    });
  });
}

//convert celsius to fahrenheit temperature
fahrenheitTemp.addEventListener("click", (event) => {
  event.preventDefault();
  fahrenheitTemp.classList.add("disabledTemp");
  celsiusTemp.classList.remove("disabledTemp");
  let fahrenheitTemperature = Math.round(
    (parseInt(temperature.innerHTML) * 9) / 5 + 32
  );
  temperature.innerHTML = fahrenheitTemperature;
});

//convert fahrenheit temperature to celsius
celsiusTemp.addEventListener("click", (event) => {
  event.preventDefault();
  celsiusTemp.classList.add("disabledTemp");
  fahrenheitTemp.classList.remove("disabledTemp");
  let celsiusTemperature = Math.round(
    ((parseInt(temperature.innerHTML) - 32) * 5) / 9
  );
  temperature.innerHTML = celsiusTemperature;
});

let formSearch = document.querySelector("#formSearch");

//search for a specific city to show
formSearch.addEventListener("submit", showSearch);
function showSearch(event) {
  event.preventDefault();

  let apiKey = "56cb6ef4c4t2co40cabe790e0e85623b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchContent.value}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then((response) => {
    temperature.innerHTML = Math.round(response.data.temperature.current);
    humidity.innerHTML = Math.round(response.data.temperature.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    cityName.innerHTML = response.data.city;
    weatherDescription.innerHTML = response.data.condition.description;
    document.getElementById("imageId").src = response.data.condition.icon_url;

    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchContent.value}&key=${apiKey}`;
    axios.get(forecastApiUrl).then((forecastResponse) => {
      console.log(forecastResponse.data);
      console.log(forecastResponse.data.daily);
      showForecast.innerHTML = "";

      for (let i = 1; i < 6; i++) {
        let forecastDate = forecastResponse.data.daily[i].time;
        forecastDate = new Date(forecastDate * 1000);
        let forecastDay = forecastDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        showForecast.innerHTML =
          showForecast.innerHTML +
          `<span class="mt-4 me-2 mb-3 ms-2 col-2"><ul><li>
              ${forecastDay}
            </li>
            <li>
              <img src="${
                forecastResponse.data.daily[i].condition.icon_url
              }" alt="" id="imageId">
            </li>
            <li>
              <span>${Math.round(
                forecastResponse.data.daily[i].temperature.minimum
              )}°</span>
              <span> ${Math.round(
                forecastResponse.data.daily[i].temperature.maximum
              )}° </span>
            </li>
          </ul>
        </span>`;
        console.log(i);
      }
    });
  });
}

//search for current city
let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(showIt);
  function showIt(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "56cb6ef4c4t2co40cabe790e0e85623b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}`;

    console.log("***" + apiUrl);
    axios.get(apiUrl).then((response) => {
      temperature.innerHTML = Math.round(response.data.temperature.current);
      humidity.innerHTML = Math.round(response.data.temperature.humidity);
      wind.innerHTML = Math.round(response.data.wind.speed);
      cityName.innerHTML = response.data.city;
      weatherDescription.innerHTML = response.data.condition.description;
      document.getElementById("imageId").src = response.data.condition.icon_url;
    });
  }
});

// let ourForecastApi = `http://api.openweathermap.org/data/2.5/forecast?lat=35.6892523&lon=51.3896004&appid=9d5e9ae00531cc47a1afce47e2f9473b&units=metric`;
// let showForecast = document.querySelector("#showForecast");
// axios.get(ourForecastApi).then( response => {

// 	for (let i = 0; i < 40; i++){
// 		if (i == 7 || i == 15 || i == 23 || i == 31 || i ==39) {
// 			let forecastDate = response.data.list[i].dt;
// 			forecastDate = new Date(forecastDate * 1000);
// 			let forecastDay = forecastDate.toLocaleDateString("en-US", {weekday: "short"});

// 			showForecast.innerHTML = showForecast.innerHTML + `<span class="mt-4 me-2 mb-3 ms-2 col-2"><ul><li>
//             ${forecastDay}
//           </li>
//           <li id="firstDay">
//             <img src="https://openweathermap.org/img/wn/${response.data.list[i].weather[0].icon}@2x.png" alt="" id="imageId">
//           </li>
//           <li>
//             ${Math.round(response.data.list[i].main.temp)}
//           </li>
//         </ul>
//       </span>`;
//       		console.log(i);

// 		}

// 	}
// })
