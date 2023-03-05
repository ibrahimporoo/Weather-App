// 647af388216c13b642bc25959e73e9c3
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchBtn = document.querySelector('.search-bar button');
const notFound = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

searchBtn.addEventListener('click', _ => {

	const city = document.querySelector('.user-input').value;

	if(city.length > 0) {
		const apiKey = '647af388216c13b642bc25959e73e9c3';
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if(data.cod === '404') {
					weatherBox.style.display = 'none';
					weatherDetails.style.display = 'none';
					notFound.style.display = 'block';
					notFound.classList.add('fadeIn');
					alert(data.message);
					return
				} else {
					notFound.style.display = 'none';
					notFound.classList.remove('fadeIn');
					weatherBox.style.display = 'block';
					weatherBox.classList.add('fadeIn');
					weatherDetails.style.display = 'flex';
					switch(data.weather[0].main) {
						case 'Clouds':
							weatherBox.querySelector('img').src = 'images/cloud.png'
							break;
						case 'Mist':
							weatherBox.querySelector('img').src = 'images/mist.png'
							break;
						case 'Rain':
							weatherBox.querySelector('img').src = 'images/rain.png'
							break;
						case 'Snow':
							weatherBox.querySelector('img').src = 'images/snow.png'
							break;
						default:
							weatherBox.querySelector('img').src = 'images/clear.png'
							break;
					}
					weatherBox.querySelector('.temprature').innerHTML = `${parseInt(data.main.temp)} <span>°C</span>`
					weatherBox.querySelector('.description').innerText=data.weather[0].description;
					const humidity = document.querySelector('.humidity span');
					const wind = document.querySelector('.wind span');
					humidity.innerHTML = `${parseInt(data.main.humidity)}%`;
					wind.innerHTML = data.wind.speed + ' Km/h';
				}
			})
			
		} else {
		alert("Enter the location first");
	}

});
