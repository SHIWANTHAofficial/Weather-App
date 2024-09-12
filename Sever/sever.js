
let map; // Declare the map variable outside

function getUserLocation() {
  document.getElementById("searchBtn").addEventListener('click', () => {
    let locations = document.getElementById("search").value;

    const key = "a5e22f31e11049e488433654241109";
    const days = 6;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${locations}&days=${days}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Your weather data processing code here...

        const latitude = data.location.lat;
        const longitude = data.location.lon;

        // Check if the map is already initialized
        if (!map) {
          // Initialize the map only if it hasn't been initialized yet
          map = L.map('map').setView([latitude, longitude], 10);

          // Add the tile layer to the map
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
          }).addTo(map);

          // Add a marker to the map
          L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>${data.location.name}</b><br>Current Weather: ${data.current.temp_c}°C`)
            .openPopup();
        } else {
          // If the map is already initialized, just set the new view
          map.setView([latitude, longitude], 10);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert(`Failed to fetch weather data: ${error.message}`);
      });
  });
}

// Initialize the event listeners







function browserLocation() {
  // Use the browser's geolocation API to get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Initialize the map using Leaflet
        const map = L.map('map').setView([latitude, longitude], 13);

        // Add the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Add a marker for the user's location
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup("<b>Your Location</b>").openPopup();

        // Use the coordinates to fetch the weather data
        const key = "a5e22f31e11049e488433654241109";
        const days = 6;

        // Fetch the weather data for the current location
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=${days}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // Format date and time
            const dateStr = data.location.localtime;
            const date = new Date(dateStr);

            const formattedDate = date.toLocaleString('en-US', {
              weekday: 'long',   // Tuesday
              year: 'numeric',   // 2024
              month: 'long',     // September
              day: 'numeric',    // 12
            });

            const formattedTime = date.toLocaleString('en-US', {
              hour: '2-digit',   // 04
              minute: '2-digit', // 06
              hour12: true       // 12-hour format
            });

            // Update HTML elements with weather data
            document.getElementById("MLocationName").innerHTML = data.location.name;
            document.getElementById("MTempValue").innerHTML = data.current.temp_c;
            document.getElementById("nowdateclocation").innerHTML = formattedDate;
            document.getElementById("nowtimeclocation").innerHTML = formattedTime;
            document.getElementById("Mainwiconone").src = data.current.condition.icon;
            document.getElementById("windsn0w").innerHTML = data.current.wind_kph;
            document.getElementById("sunrise3box").innerHTML = data.forecast.forecastday[0].astro.sunrise;
            document.getElementById("sunset3box").innerHTML = data.forecast.forecastday[0].astro.sunset;

            // Update the weather boxes for the next 6 days
            const forecast = data.forecast.forecastday;
            forecast.forEach((day, index) => {
              if (index >= 6) return;

              const dayDateId = `day${index + 1}-date`;
              const dayIconId = `day${index + 1}-icon`;
              const dayTempId = `day${index + 1}-temp`;

              document.getElementById(dayDateId).innerHTML = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
              document.getElementById(dayIconId).src = day.day.condition.icon;
              document.getElementById(dayIconId).alt = day.day.condition.text;
              document.getElementById(dayTempId).innerHTML = `${day.day.avgtemp_c}°C`;
            });
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      (error) => {
        console.error('Error getting location:', error.message);
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
  }

  // JavaScript to toggle dark mode and light mode
  document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
  });

  // Function to handle search input (if needed)
  function returnSearchValue() {
    document.getElementById("searchBtn").addEventListener('click', () => {
      const city = document.getElementById("search").value;
      return city;
    });
  }

  // Dismiss alert banner
  const dismissBtn = document.querySelector('.dismiss-btn');
  const alertBanner = document.querySelector('.alert-banner');

  dismissBtn.addEventListener('click', () => {
    alertBanner.style.display = 'none'; // Hide the alert banner
  });
}

// Call the function to get the location and display the map







window.onload = browserLocation;
getUserLocation();

// document.getElementById("searchBtn").addEventListener('click', getUserLocation);
