// load the page when it is fully loaded
$(document).ready(function () {
  const date = moment().format("llll");
  // console.log(date);
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const key = "&appid=b1771496f45c74d965bd4b3150378e81";

  // DOM tags

  let resultArr = [];
  let searchInput = $("#search-input");
  let responseResult;

  function buttons(value) {
    //empty the group of dynamic elements
    $(".list-group").empty();
    //loop through the
    cities.forEach(function (location) {
      // creating button dynamically
      let list = $(".list-group");
      let buttons = $("<button>")
        .attr(`value`, `${location}`)
        .addClass("buttons")
        .text(`${location}`);
      list.append(buttons);
    });
  }

  buttons(searchInput);

  // search button

  $("#search-button").on("click", function (e) {
    e.preventDefault();

    let cityInput = $("#search-input").val().trim();
    // conditional statement to add only new cities in my array
    if (!cities.includes(cityInput) && cityInput !== "") {
      cities.push(cityInput);
      // setting up local storage
      localStorage.setItem("cities", JSON.stringify(cities));
      // need to add two functions here :  to create a button and to call an API
      // create a button
      buttons(cityInput);
      // call the api
      callApi(cityInput);
    }
  });
  //AJAX call

  function callApi(value) {
    $("#today").empty();
    $("#forecast").empty();

    $.ajax({
      url: queryURL + value + key,
      method: "GET",
    }).then(function (response) {
      responseResult = response;

      let icon = response.list[0].weather[0].icon;

      // dynamically creating elements to get the data on the page

      let i = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );

      let returnedCity = $("<h2>")
        .text(response.city.name + "\n" + " " + "(" + date + ")")
        .append(i);

      let currentTemp = $("<h3>").text(
        "Temp: " + (response.list[0].main.temp - 273.15).toFixed(2) + "°C"
      );

      let mph = $("<h3>").text("Wind: " + response.list[0].wind.speed + " kmH");

      let humidity = $("<h3>").text(
        "Humidity " + response.list[0].main.humidity + " %"
      );

      $("#today").prepend(returnedCity);
      $("#today").append(currentTemp, mph, humidity);
      futureForecast();
    });
  }

  // 5 day forecast

  function futureForecast() {
    for (i = 1; i < responseResult.list.length; i++) {
      let listItem = responseResult.list[i].dt_txt
        .split(" ")
        .includes("03:00:00");
      if (listItem) {
        resultArr.push(responseResult.list[i]);
      }
    }
    fiveDay();
  }
  // 5 day forecast function to create elements

  function fiveDay() {
    // dynamic elements for the forecast
    let flexContainer = $("<div>").addClass("container");
    let title = $("<h3>").attr("id", "title").addClass("future-weather");
    title.text("Weather forecast for 5 days");
    let cardDiv = $("<div>").addClass("flex");
    flexContainer.append(cardDiv);
    $("#forecast").append(title, flexContainer);

    for (let i = 0; i < resultArr.length; i++) {
      let forecastDay = $("<div>")
        .attr("id", `day${i}`)
        .addClass("col-sm card");
      cardDiv.append(forecastDay);
      let dates = moment()
        .add(i + 1, "days")
        .format("llll");
      let p = $("<p>").text(dates);
      $(`#day${i}`).prepend(p);

      // dynamic elements for forecast
      let tempFuture = resultArr[i].main.temp - 273.15;
      let currTemp = tempFuture.toFixed(2) + "°C";
      let weatherIcon = resultArr[i].weather[0].icon;
      let speed = resultArr[i].wind.speed;
      let humi = resultArr[i].main.humidity;
      let pic = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      );
      let temperature = $("<p>").text("Temperature: " + currTemp);
      let windEl = $("<p>").text("Wind: " + speed + " kmH");
      let humiEl = $("<p>").text("Humidity: " + humi + "%");
      $(`#day${i}`).append(pic, temperature, windEl, humiEl);
    }
  }

  // rendering the page

  $(document).on("click", ".buttons", function (event) {
    event.preventDefault();
    let buttonContent = $(this).text();

    callApi(buttonContent);
  });
  // Disable the button
});
