async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "6eaa2295e8aa04d2d5bf6468202f16dc";
    const url = `https:api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
            document.getElementById("weatherResult").innerHTML = `
                <h2>${data.name}</h2>
                <p>🌡️ ${data.main.temp}°C</p>
                <p>☁️ ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>💨 Wind: ${data.wind.speed} m/s</p>
                `;
        } else {
            document.getElementById("weatherResult").innerHTML = `<p>City not found.</p>`;
        }
    } catch (error) {
        console.log(error);
        document.getElementById("weatherResult").innerHTML = `<p>Error fetching data.</p>`;
    }
}