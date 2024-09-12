const key = "a5e22f31e11049e488433654241109";
const locations ="kelaniya";
const days = 6; 

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${locations}&days=${days}`)

  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {

// Original date string
const dateStr = data.location.localtime;

// Convert the string into a JavaScript Date object
const date = new Date(dateStr);

// Format the date
const formattedDate = date.toLocaleString('en-US', {
  weekday: 'long',   // Tuesday
  year: 'numeric',   // 2024
  month: 'long',     // September
  day: 'numeric',    // 12
});

console.log(formattedDate); // Output: "Thursday, September 12, 2024, "

// Format the time
const formattedtime = date.toLocaleString('en-US', {
  hour: '2-digit',   // 04
  minute: '2-digit', // 06
  hour12: true       // 12-hour format
});
console.log(formattedtime);    //04:06 AM


    console.log(data); 

    // const locationName = data.location.name;
    // const country = data.location.country;
    // const localtime = data.location.localtime;

    // Access current weather details
    document.getElementById("MLocationName").innerHTML= data.location.name;
    document.getElementById("MTempValue").innerHTML= data.current.temp_c;
    document.getElementById("nowdateclocation").innerHTML= formattedDate;
    document.getElementById("nowtimeclocation").innerHTML= formattedtime;
    document.getElementById("Mainwiconone").src= data.current.condition.icon;
    document.getElementById("windsn0w").innerHTML= data.current.wind_kph;
    
    // const temperatureF = data.current.temp_f;
    // const temperatureC = data.current.temp_c;
    // const conditionText = data.current.condition.text;
    // const windSpeedKph = data.current.wind_kph;
    // const humidity = data.current.humidity;

    // Log specific data
    // console.log(`Location: ${locationName}, ${country}`);
    // console.log(`Local Time: ${localtime}`);
    // console.log(`Temperature: ${temperatureC}°C (${temperatureF}°F)`);
    // console.log(`Condition: ${conditionText}`);
    // console.log(`Wind Speed: ${windSpeedKph} kph`);
    // console.log(`Humidity: ${humidity}%`);


    const forecast = data.forecast.forecastday;
    const weatherContainer = document.getElementById('weather-container');

    // Loop through each day's forecast and create a weather box
    forecast.forEach((day, index) => {
      if (index >= 6) return; // Limit to 6 days

      // Create HTML for each weather box
      const weatherBox = `
        <div class="col-2">
          <div class="weather-box bg-dark text-center p-3 rounded">
            <p>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img class="weather-iconb" src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            <p>${day.day.avgtemp_c}°C</p>
          </div>
        </div>
      `;

      // Append the weather box to the container
      weatherContainer.innerHTML += weatherBox;
    });
  


  })



  .catch(error => {

    console.error('Error fetching data:', error); 
  });





// JavaScript to toggle dark mode and light mode
document.getElementById('darkModeToggle').addEventListener('click', function () {
    // Toggle between dark and light mode by adding/removing classes
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

document.getElementById('')('click',()=>{

})


