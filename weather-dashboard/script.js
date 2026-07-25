// console.log('Hello');

// const URL = `https://api.openweathermap.org/data/4.0/onecall/current?lat=${}&lon=${}&appid=${}
// const geocodingURL = `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
// `;


async function fetchWeatherData(){
    const response = await fetch(URL);
}



const searchButtonElement = document.querySelector('.js-dashboard-search-button');
searchButtonElement.addEventListener('click',()=>{
 console.log('clicked');
 
});


const deleteHistoryButtonElement = document.querySelector('.js-delete-history-button')
