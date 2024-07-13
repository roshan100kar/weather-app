const API_KEY = "1396833f8de2c75a29b230999f8c069d";
const weatherDataElm = document.querySelector(".weather-data")
const cityName = document.querySelector('#city-name');
const formElm = document.querySelector('form');
const imgIcon = document.querySelector('.icon');

formElm.addEventListener('submit', (e)=> {
    e.preventDefault();
    // console.log(cityName.value);
    const cityValue = cityName.value;
    getWather(cityValue)
    
})

async function getWather(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`);
        if(!response.ok) {
            throw new Error("Network response is not ok");
        }
        const data = await response.json();
        // console.log(data);
        // console.log(data.main.temp)
        const temprature = Math.floor(data.main.temp);
        
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.floor(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]
        weatherDataElm.querySelector('.tmp').textContent = `${temprature}°C`;
        weatherDataElm.querySelector(".description").textContent = `${description}`;
        imgIcon.innerHTML = `<img class="icn" src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        weatherDataElm.querySelector('.details').innerHTML = details.map((deatail)=> {
            return `<div>${deatail}</div>`
        }).join()

        
        
    } catch(err) {
        console.log(err);
    }   
}