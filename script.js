// This is my API key... ""
var APIKey = "e4509642d356f7d3b99ccfe567f88f02";
var cities = [];
var test = true;
var lat = 0;
var lon = 0;

function queryWeather(inputtext) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + inputtext + "&units=Imperial&appid=" + APIKey;
    console.log("queryURL = " + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log("openweather response = " + JSON.stringify(response));

        let montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        const t = response.dt;
        // console.log("t = " + t);

        let date = new Date(t * 1000);
        let year = date.getFullYear();
        let month = date.getMonth();
        let monthTxt = montharray[month]
        let day = date.getDate();
        let hours = date.getHours();
        if (hours < 0) {
            hours = hours + 24;
        }
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        var currentDate = monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
        var currentTempvalue = response.main.temp;
        var currentHumidityvalue = response.main.humidity;
        var currentWindSpeedvalue = response.wind.speed;
        var currentCityNamevalue = response.name;

        console.log("Date and Time = " + monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));
        console.log("Temperature = " + response.main.temp + " °F");
        console.log("Humidity = " + response.main.humidity + " %");
        console.log("Wind Speed = " + response.wind.speed + " MPH");
        console.log("City Name = " + currentCityName);

        var lat = response.coord.lat;
        // console.log("lat = " + lat);
        var lon = response.coord.lon;
        // console.log("lon = " + lon);
        var currentUVIndexvalue = 0;

        // console.log("currentUVIndexvalue *** = " + currentUVIndexvalue);

        $("#current").empty();
        // console.log("currentUVIndexvalue after clear = " + currentUVIndexvalue);
        var currentCityName = $("<div>").text(currentCityNamevalue + " (" + currentDate + ") ").attr({ id: "currentCityName", float: "left", size: "30" }).addClass("currentCityName");
        var currentTemp = $("<div>").text("Temperature - " + currentTempvalue + " °F").attr({ id: "currentTemp", float: "left", size: "30" }).addClass("currentTemp");
        var currentHumidity = $("<div>").text("Humitity - " + currentHumidityvalue + " %").attr({ id: "currentHumidity", float: "left", size: "30" }).addClass("currentHumidity");
        var currentWindSpeed = $("<div>").text("Wind Speed - " + currentWindSpeedvalue + " MPH").attr({ id: "currentWindSpeed", float: "left", size: "30" }).addClass("currentWindSpeed");
        // // Creating a div container for currentTemp
        var containerTemp = $("<div>").attr({ id: "container", style: "font-size: 2vw" });
        // container.append(currentTemp);
        containerTemp.append(currentCityName, currentTemp, currentHumidity, currentWindSpeed);
        $("#current").append(containerTemp);
        queryUV(currentUVIndexvalue, lat, lon);

    });
}

function queryUV(currentUVIndexvalue, lat, lon) {
    var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
    console.log("in queryUV function");

    $.ajax({
        url: queryUVURL,
        method: "GET"
    }).then(function(response) {

        //console log response.value
        console.log("UV Index = " + response.value);
        var currentUVIndex = $("<div>").text("UV Index - " + response.value).attr({ id: "currentUVIndex", float: "left", size: "30" }).addClass("currentUVIndex");
        // // Creating a div container for currentTemp
        var containerUVIndex = $("<div>").attr({ id: "container", style: "font-size: 2vw" });
        // container.append(currentTemp);
        containerUVIndex.append(currentUVIndex);
        $("#currentWindSpeed").append(containerUVIndex);
        queryForcast(lat, lon);
    });

};


function queryForcast(lat, lon) {

    console.log("in queryForcast...")

    console.log("lat = " + lat);
    console.log("lon = " + lon);


    var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,hourly,minutely&units=Imperial&appid=" + APIKey;

    $.ajax({
        url: query2URL,
        method: "GET"
    }).then(function(response) {

        $(".card-title").empty();
        $(".card-text").empty();


        let montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        for (let i = 0; i < 5; i++) {

            const t = response.daily[i].dt;
            // console.log("t = " + t);

            let date = new Date(t * 1000);
            let year = date.getFullYear();
            let month = date.getMonth();
            let monthTxt = montharray[month]
            let day = date.getDate();
            let hours = date.getHours() - 5;
            if (hours < 0) {
                hours = hours + 24;
            }
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();

            // console.log("list["" + i + "].dt in human form = " + monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));
            console.log("daily[" + i + "].dt in human form = " + monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));
            // console.log("list[" + i + "].dt_txt in human form = " + response.list[i].dt_txt);
            // var averagetemp = (response.list.main.temp_min + response.list.main.temp_max) / 2;  
            console.log("response.daily[" + i + "].temp.day = " + response.daily[i].temp.day + " deg F");
            console.log("response.daily[" + i + "].humidity = " + response.daily[i].humidity + "%");
            console.log("response.daily[" + i + "].weather[0].main = " + response.daily[i].weather[0].main);

            forcastDate = $("<div>").text(monthTxt + "-" + day + "-" + year).attr({ id: "forcastDate", float: "left", size: "30" }).addClass("forcastDate");
            forcastTemp = $("<div>").text("Temp: " + response.daily[i].temp.day + " °F").attr({ id: "forcastTemp", float: "left", size: "30" }).addClass("forcastTemp");
            forcastHumidity = $("<div>").text("Humidity: " + response.daily[i].humidity + "%").attr({ id: "forcastHumidity", float: "left", size: "30" }).addClass("forcastHumidity");
            var containerforcastDate = $("<div>").attr({ id: "container", style: "font-size: 2vw" }).html("</br>");
            var containerforcastWeather = $("<div>").attr({ id: "container", style: "font-size: 1.5vw" });
            containerforcastDate.append(forcastDate);
            containerforcastWeather.append(forcastTemp, forcastHumidity);


            if (i === 0) {
                $("#t1").append(containerforcastDate);
                $("#text1").append(containerforcastWeather);
            }
            if (i === 1) {
                $("#t2").append(containerforcastDate);
                $("#text2").append(containerforcastWeather);
            }
            if (i === 2) {
                $("#t3").append(containerforcastDate);
                $("#text3").append(containerforcastWeather);
            }
            if (i === 3) {
                $("#t4").append(containerforcastDate);
                $("#text4").append(containerforcastWeather);
            }
            if (i === 4) {
                $("#t5").append(containerforcastDate);
                $("#text5").append(containerforcastWeather);
            }

            // class="fa fa-sun-o" aria-hidden="true"
            // class="fa fa-cloud" aria-hidden="true"
            // class="fa fa-tint" aria-hidden="true"
        }
    });

}

// // Jumbtron to display title...
function writeJumbo() {
    var jumbohtag = $("<h1>").attr({ id: "jumboh1" }).addClass("display-4").text("Weather Dashboard");
    var jumboContainer = $("<div>").attr({ id: "jumboContainer" }).addClass("container");
    jumboContainer.append(jumbohtag);
    var jumbo1 = $("<div>").attr({ id: "jumbo1" }).addClass("jumbotron jumbotron-fluid");
    jumbo1.append(jumboContainer);
    $("#jumbodiv").append(jumbo1);

}

function writePage() {

    // Adding input box
    var textInput = $("<h3>").text("Search for a City").attr({ id: "textInput", float: "left", size: "30" }).addClass("textInput");
    var cityInput = $("<input>").attr({ id: "cityInputid", float: "left", size: "15" }).addClass("border border-secondary rounded-lg input");
    // Adding save button
    var citySearch = $("<button>").attr({ id: "citySearch" }).addClass("border border-secondary rounded-lg button fa fa-search bg-secondary citySearch");
    // // Creating a div container for these 3 items...
    var container = $("<div>").attr({ id: "container", style: "font-size: 2vw" });
    // container.append(plannerTimes, plannerInput, plannerSave);
    container.append(textInput, cityInput, citySearch);
    $("#startdiv").append(container);
    // $(".bg").css("background-image", "url('techbackground.jpg')");
}

// init function to pull cities if there are any and put onto page...
function init(parameter) {
    var citiesSaved = JSON.parse(localStorage.getItem("cities"));
    if (citiesSaved !== null) {
        cities = citiesSaved;
        for (let i = 0; i < cities.length; i++) {
            var inputtext = cities[i];
            var cityButton = $("<button>");
            cityButton.addClass("cityButton");
            var buttoncr = $("<div>");
            buttoncr.html("</br>");
            cityButton.text(inputtext);
            cityButton.attr({ id: "button" + [i] });
            $("#display").append(buttoncr, cityButton);
            if (i >= "5") break;
        }
    }
    $(".cityButton").on("click", function() {
        console.log("in button event handler...");
        console.log("id of button = " + this.id);
        // var buttontext = $("#" + this.id).text();
        console.log("text in button = " + $("#" + this.id).text());
        var inputtext = $("#" + this.id).text()
        queryWeather(inputtext);
        // queryForcast();
    });

}

// function to save todo to local storage...
function saveCity(inputtext) {
    cities.unshift(inputtext);
    localStorage.setItem("cities", JSON.stringify(cities));
    $("#display").empty();
    init();
}


function loadbutton0() {

    var citiesSaved = JSON.parse(localStorage.getItem("cities"));
    if (citiesSaved !== null) {
        cities = citiesSaved;
        var inputtext = cities[0];
        queryWeather(inputtext);
    }

}

// queryWeather();
// queryUV();
// queryForcast();
writeJumbo();
writePage();
init();
loadbutton0();



$("#citySearch").on("click", function() {
    var inputtext = $("#cityInputid").val();
    var cityButton = $("<button>");
    cityButton.addClass("cityButton");
    var buttoncr = $("<div>");
    buttoncr.html("</br>");
    cityButton.text(inputtext);
    $("#display").prepend(buttoncr, cityButton);
    $('#cityInputid').val('');
    saveCity(inputtext);
    queryWeather(inputtext);
    // queryForcast();
});

$(".cityButton").on("click", function() {
    console.log("in button event handler...");
    console.log("id of button = " + this.id);
    // var buttontext = $("#" + this.id).text();
    console.log("text in button = " + $("#" + this.id).text());
    var inputtext = $("#" + this.id).text()
    queryWeather(inputtext);
    // queryForcast();
});