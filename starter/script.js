// load the page when it is fully loaded
$(document).ready(function () {
  const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const key = "8a6e247e634be119fd5fd7939e946b46";
  const date = moment().format("llll");
  console.log(date);
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  // let queryURL =
  //   "https://api.openweathermap.org/data/2.5/weather?q=" +
  //   cityURL +
  //   "&appid=" +
  //   APIKey +
  //   "&units=metric";

  // DOM tags

  let resultArr = [];
  let searchInput = $("#search-input");
  let today = $("#today");
  let forecast = $("#forecast");

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
      buttons();
      // call the api
      callApi();
    }
  });

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

  //AJAX call

  const callApi = (value) => {
    $("#today").empty();
    arr = [];
    $("#forecast").empty();

    $.ajax({
      url: queryURL + value + key,
      method: "GET",
    }).then(function (response) {});
  };

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).then(function (response) {
  //   //
  // });

  //structure
});
