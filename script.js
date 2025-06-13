async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "YOUR_API_KEY_HERE"; // 🔁 Replace with your OpenWeatherMap API key

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  // Show loading
  document.getElementById("loading").style.display = "block";
  document.getElementById("weatherResult").innerHTML = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { name } = data;
    const { temp, feels_like, humidity } = data.main;
    const weather = data.weather[0].main;
    const icon = data.weather[0].icon;

    document.getElementById("weatherResult").innerHTML = `
      <h2>${name}</h2>
      <p><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}" /></p>
      <p><strong>${weather}</strong></p>
      <p>Temperature: ${temp} °C</p>
      <p>Feels Like: ${feels_like} °C</p>
      <p>Humidity: ${humidity}%</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `
      <p style="color: red;">${error.message}</p>
    `;
  } finally {
    document.getElementById("loading").style.display = "none";
  }
}

// Load last searched city on page load
window.onload = function () {
  document.getElementById("cityInput").value = "Delhi"; // Default city
};
