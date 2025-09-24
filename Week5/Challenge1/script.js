const weather_type_images = {
    "Clear": "images/clear.jpg",
    "Clouds": "images/clouds.jpg",
    "Haze": "images/haze.jpg",
    "Mist": "images/mist.jpg",
    "Rain": "images/rain.jpg",
    "Smoke": "images/smoke.jpg",
    "Snow": "images/snow.jpg",
    "Thunderstorm": "images/thunderstorm.jpg"
};

const temp_images = {
    "Hot": "images/hot.jpg",   // Celsius > 25
    "Okay": "images/okay.jpg", // Celsius 5-25
    "Cold": "images/cold.jpg"  // Celsius < 5
};


// DO NOT CHANGE THE FUNCTION SIGNATURE
function check_weather() {

    console.log("=== [START] check_weather() ===");

    //============================================================================
    // Task 1
    // Key in your own OpenWeatherMap.org API key (DO NOT SHARE IT WITH OTHERS)
    //============================================================================
    const weather_api_key = '';


    //============================================================================
    // Task 2
    // Retrieve the user input (city name) from <input>
    //============================================================================
    
    const city = document.getElementById("city").value; // Default value, you need to replace this string with actual user input
    
    // DO NOT MODIFY THIS
    let api_endpoint = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_api_key}&units=metric`;


    axios.get(api_endpoint)
    .then(response => {
        // Inspect what's in the API response
        


        //============================================================================
        // Task 3
        // Retrieve the weather info (e.g. Rain, Clouds, etc.)
        //============================================================================
        let weather = response.data.weather;
        let weather_list = [];
        for(w of weather){
            weather_list.push(w.main)
        }
        



        let temp = response.data.main.temp;
        // YOUR CODE GOES HERE
        // Make use of const weather_type_images (at the top)
        let tempImg = "";
        if(temp > 25){
            tempImg = temp_images["Hot"];
        }
        else if(temp>= 5){
            tempImg = temp_images["Okay"];
        }
        else{
            tempImg = temp_images["Cold"];
        }


        
        let weatherImg = weather_type_images[weather];

        //======================================================================================
        // Task 4
        // Perform JavaScript DOM to reflect weather info and temperature info in the HTML page.
        //======================================================================================

        // YOUR CODE GOES HERE
        // Make use of const temp_images (at the top)
        let tempImgElement = document.getElementById("temperature_image")
        tempImgElement.src = tempImg;

        let weatherImgElement = document.getElementById("weather_images");
        weatherImgElement.innerHTML = "";
        for(w of weather_list){
            let pElement = document.createElement("p");
            let imgElement = document.createElement("img");
            imgElement.src = weather_type_images[w];
            pElement.appendChild(imgElement);
            weatherImgElement.appendChild(pElement);
        }
        
    })
    .catch(error => {
        console.log(error.message);
    })
    
    console.log("=== [END] check_weather() ===");
}
