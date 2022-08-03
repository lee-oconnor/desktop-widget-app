let accessKey = "qT4ZAqfM9RX8MKOE0OTrZXA9YJmxjzhQpYDDyaU8jYg"
const weatherAccessKey = "0c872847fb7040900e457daeb64da9bc"


//ACCESS THE UPSPLASH API TO GET RANDOM PHOTOS AND SET AS BACKGROUND IMAGE 
fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${accessKey}`)
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("photo-cred").textContent = `Photo by ${data.user.name}`
        console.log(data.user.name)
    })


//ACCESS THE COINGECKO API TO GET DOGECOIN INFO
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.querySelector(".crypto").innerHTML = `
        <div class="doge-data">
                <img src=${data.image.small} width="75px" height="75px">
                <h2 id="crypto-name">${data.name}</h2>
                <p>Current Price:${data.market_data.current_price.usd}</p>
                <p>Daily High:${data.market_data.high_24h.usd}</p>
                <p>Daily Low:${data.market_data.low_24h.usd}</p>
            </div>
        
        
        `
    })
    .catch(err => console.error(err))

//UPDATE TIME ON DESKTOP
function updateTime() {
    const date = new Date()
    let time = date.toLocaleTimeString("en-us", { timeStyle: "short" })
    document.querySelector(".time").textContent = time
}

setInterval(updateTime, 500)

//USE GEOLOCATION WEB API TO GET CURRENT LOCATION COORDINATES AND PULL DATA TO POPULATE WEB PAGE WITH CURRENT WEATHER
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherAccessKey}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Cannot get weather info")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <div id="icon-temp">
                <img id="weather-icon" src=${iconUrl} /> 
                <p id="temp">${Math.round(data.main.temp)}&deg;C </p>
                </div>
                <p id="location">${data.name}</p>
            `
        })

        .catch(err => console.error(err))

})
