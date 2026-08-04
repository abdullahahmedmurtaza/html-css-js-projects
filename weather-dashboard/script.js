async function getLongLat(cityName){
    try{
        throw 'error1';
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=63f097efdb8310eeb66d1514089df0bc`).then((response)=>{
         return response.json();
    });
    }catch(error){
        console.log(error);
    }
}

getLongLat('London');


const searchButtonElement = document.querySelector('.js-dashboard-search-button');
searchButtonElement.addEventListener('click',()=>{
 console.log('clicked');
 
});
const deleteHistoryButtonElement = document.querySelector('.js-delete-history-button')
deleteHistoryButtonElement.addEventListener('click',()=>{
    console.log('history deleted');
});
