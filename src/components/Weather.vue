d<template>
    <div id="weather-app">
        <div class="search-box">
            <h3>Where do you live?</h3>
            <input v-model="query" @keyup.enter="fetchWeather" type="text" class="search-bar" placeholder="Search...">
        </div>
        <div class="weather-wraper" v-if="typeof weather.main != 'undefined'">
            <span class="location">{{weather.name}}, {{weather.sys.country}}</span>
            <span class="time">{{dateBuilder()}}</span>
            <span class="temp">{{Math.round(weather.main.temp)}}C°</span>
            <span class="weather">{{weather.weather[0].main}}</span>
            
            <div :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'weather-icon' : 'weather-icon cold'"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                api_key: 'ad76f15be690fc67a072cd36e3c56df0',
                query: '',
                weather: {},
                options: {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com',
                        'X-RapidAPI-Key': 'd51dd240efmsh928e8e98cfc573cp1e2e92jsncb15d0c74ca1'
                    }
                }
            };
        },
        methods: {
            fetchWeather() { 
                if(this.query !== '') {
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.query}&mode=json&units=metric&appid=${this.api_key}`)
                    .then(res => {
                        return res.json();
                    }).then (this.setResults);
                }
            },
            setResults(results){
                this.weather = results;
                this.query = '';
            },
            dateBuilder () {
                let d = new Date();
                let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let day = days[d.getDay()];
                let date = d.getDate();
                let month = months[d.getMonth()];
                let year = d.getFullYear();
                return `${day}, ${month} ${date}, ${year}`;
            },
            showCurrentLocationWeather(city){
                this.query = city;
                this.fetchWeather();
            }
        }
    }
</script>   

<style>
    #weather-app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25rem;
        padding: 1rem 2rem 2rem 2rem;
        min-height: 20rem;
        background-size: cover;
    }
    .temp {
        font-size: 1.7rem;
        margin-block: .5rem;
        font-weight: 500;
    }
    .search-box {
        width: 100%;
    }
    .search-box input {
        width: 100%;
        height: 2.5rem;
        padding: .5rem 1rem;
        border: none;
        border-radius: .35rem;
        outline: none;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
    }
    .search-box h3 {
        font-weight: 500;
        margin-block-end: 1rem; 
        font-size: 1.5rem;
    }
    .weather-wraper {
        position: relative;
        margin-block-start: 1rem;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: .5rem;
        padding: 1.5rem 1rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: .4rem;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .05);
    }
    .weather-icon {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 10%;
        right: 10%;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(../assets/sunny.svg);
    }
    .weather-icon.cold {
        background-image: url(../assets/rain.svg);
    }
</style>
    