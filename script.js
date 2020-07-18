// This is my API key... ""
var APIKey = "e4509642d356f7d3b99ccfe567f88f02";

function queryWeather() {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=kansas city&units=Imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

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

        console.log("Date and Time = " + monthTxt + "-" + day + "-" + year + " " + hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0'));
        console.log("Temperature = " + response.main.temp + " deg F");
        console.log("Humidity = " + response.main.humidity + " %");
        console.log("Wind Speed = " + response.wind.speed + " MPH");
    });

}

function queryUV() {
    var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=39.1&lon=-94.58";

    $.ajax({
        url: queryUVURL,
        method: "GET"
    }).then(function(response) {

        // Create CODE HERE to log the resulting object
        // console.log("response = " + JSON.stringify(response));
        //console log response.value
        console.log("UV Index = " + response.value);

    });

};


function queryForcast() {

    // var query2URL = "https://api.openweathermap.org/data/2.5/forecast?q=kansas city&units=Imperial&appid=" + APIKey;
    // var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=current,hourly,daily&appid=" + APIKey;
    var query2URL = "https://api.openweathermap.org/data/2.5/onecall?lat=39.0997&lon=-94.5786&exclude=current,hourly,minutely&units=Imperial&appid=" + APIKey;

    $.ajax({
        url: query2URL,
        method: "GET"
    }).then(function(response) {

        // Create CODE HERE to Log the queryURL
        // console.log("queryURL = " + query2URL);
        // Create CODE HERE to log the resulting object
        // console.log("response = " + JSON.stringify(response));

        let montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

        for (let i = 1; i < 6; i++) {

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
        }
    });

}

queryWeather();
queryUV();
queryForcast();