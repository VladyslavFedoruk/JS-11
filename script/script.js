const API = "36e8bfa4c4e277713b4fda7da3f34d84";
const mainCont = document.querySelector('.main-Cont');
const inputeInfo = document.querySelector('.inpute-Info');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
console.log(API);
async function getWeather(city) {
    const response = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
    const res = await fetch(`${response}`);
    const data = await res.json();
    console.log(data);
    let temperature = `${Math.round(data.main.temp)}°C`;
    let name = data.name;
    let main = data.weather[0]['main'];
    let image = '<img src="http://openweathermap.org/img/wn/' + data.weather[0]['icon'] + '@2x.png">';
    let weatherName = document.createElement('p');
    let weatherblockPhoto = document.createElement('div');
    let weatherblockText = document.createElement('div');
    let weathertTemp = document.createElement('p');
    let weatherMain = document.createElement('p');
    weatherblockText.style.display = 'flex';
    weatherblockText.style.flexDirection = 'column';
    weatherblockText.style.gap = '10px';
    weatherName.style.fontSize = '32px';
    weathertTemp.style.fontSize = '24px';
    weatherMain.style.fontSize = '16px';
    result.appendChild(weatherblockText);
    result.appendChild(weatherblockPhoto);
    weatherblockText.appendChild(weatherName);
    weatherblockText.appendChild(weathertTemp);
    weatherblockText.appendChild(weatherMain);
    localStorage.setItem(`Name`, name);
    localStorage.setItem(`Temperature`, temperature);
    localStorage.setItem(`Weather`, main);
    localStorage.setItem(`Image`, image);
    let getName = localStorage.getItem(`Name`);
    let getTemp = localStorage.getItem(`Temperature`);
    let getWeather = localStorage.getItem(`Weather`);
    let getImg = localStorage.getItem(`Image`);
    weatherblockPhoto.innerHTML = getImg;
    weatherName.innerText = getName;
    weathertTemp.innerText = getTemp;
    weatherMain.innerText = getWeather;
    setInterval(() => {
        getWeather(city);
        localStorage.clear();
    }, 7.2e+6);

}

function displayWeather() {
    const city = (inputeInfo.value).trim();
    result.innerHTML = '';
    getWeather(city);
};
btn.addEventListener('click', displayWeather);


window.addEventListener('load', () => {
    const savedCity = localStorage.getItem('Name');
    if (savedCity) {
        inputeInfo.value = savedCity;
        displayWeather();
    }
});