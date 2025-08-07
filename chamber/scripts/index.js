// Weather Data
const API_KEY = "1880a7f6a6ca1b6a15d6107a4190dbdf";
const LATITUDE = 14.60531;
const LONGITUDE = 120.98188;

async function getWeatherData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const temp = data.main.temp;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherIcon = document.querySelector('#weather-icon');
    const weatherTemp = document.querySelector('#weather-temp');
    const weattherDescription = document.querySelector('#weather-description');

    weatherIcon.src = icon;
    weatherTemp.innerHTML = temp;
    weattherDescription.innerHTML = `${data.weather[0].main} ${data.weather[0].description}`;
}

// Weather Forecast
async function getWeatherForecast() {

    const today = new Date();
    const dates = [
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')} 00:00:00`,
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 2).padStart(2, '0')} 00:00:00`,
        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 3).padStart(2, '0')} 00:00:00`,
    ];

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&include=daily&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    const forecastedData = data.list.filter(item => {
        if (dates.includes(`${item.dt_txt}`)) {
            return item;
        }
    });

    const forecastedTemp = forecastedData.map(fd => {
        const date = new Date(fd.dt_txt);
        const month = date.toLocaleString('default', {'month': 'short'});
        const day = date.getDate();
        const temp = fd.main.temp;

        return [`${month} ${day}`, temp];
    });

    const forecastedWeather = document.querySelector('#forecasted-weather');

    forecastedTemp.forEach(data => {

        const card = document.createElement('div');
        const temp = document.createElement('div');
        const day = document.createElement('div');

        temp.classList.add('forecasted-temp');
        day.classList.add('forecasted-day');

        temp.innerHTML = `${data[1]} <span class="fr_degree">&deg;C</span>`;
        day.textContent = data[0];

        card.appendChild(temp);
        card.appendChild(day);

        forecastedWeather.appendChild(card);
    });
}

getWeatherData();
getWeatherForecast();

// Spotlight Businesses
// Fetching business data and displaying spotlight businesses
const businessCon = document.querySelector('.businesses');
const membersUrl = 'data/members.json';

async function getBusinessData() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.members;
    }
    catch(error) {
        console.error("Error fetching business data:", error);
    }

}

getBusinessData().then((members) => {
    const qualified = members.filter(member =>
      member.membership === 'Gold' || member.membership === 'Silver'
    );
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
  displayBusinessCards(selected, businessCon);
})


function displayBusinessCards(memberList,elementCon) {
    elementCon.innerHTML = "";
    memberList.forEach((member) => {
        const memberCards = `<div id="cards" class="business-card">
                <div class="bname">
                    <h3 class="b-name">${member.name}</h3>
                    <span class="mem-level">${member.membership}</span>
                </div>
                <div class="mem-info">
                    <img src="images/${member.image}" alt="${member.name}">
                    <div class="mem-details">
                        <ul>
                            <li><span class="info-label"></span><span class="mem-email">${ member.address}</span></li>
                            <li><span class="info-label"></span><span class="mem-phone">${ member.number}</span></li>
                            <li><span class="info-label"></span><a href="${member.website}" class="mem-url">${ member.name}</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>`;
        elementCon.innerHTML += memberCards;
    });
}
