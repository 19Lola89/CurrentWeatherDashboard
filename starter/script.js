// load the page when it is fully loaded
$(document).ready(function () {
  const date = moment().format("llll");
  console.log(date);
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const key = "&appid=b1771496f45c74d965bd4b3150378e81";

  //  lat={lat}&lon={lon}

  // DOM tags

  let resultArr = [];
  let searchInput = $("#search-input");
  let today = $("#today");
  let forecast = $("#forecast");

  const buttons = (location) => {
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
  };

  buttons();

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

  // retrieving

  const callApi = (value) => {
    $("#today").empty();
    $("#forecast").empty();

    $.ajax({
      url: queryURL + value + key,
      method: "GET",
    }).then(function (response) {
      // saving api object to a variable
      // let weatherObj = response;

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

      let mph = $("<h3>").text("Wind: " + response.list[0].wind.speed + " MPH");

      let humidity = $("<h3>").text(
        "Humidity " + response.list[0].main.humidity + " %"
      );

      $("#today").prepend(returnedCity);
      $("#today").append(currentTemp, mph, humidity);

      // todays section
    });
  };
  // 5 day forecast
});

//--- 5 day forecast
// date
// icon
// temperature
// humidity

// make a dropdown button functionality so that the city can be searched again.
