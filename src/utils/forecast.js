const request = require('request')

const forecast = (location, callback) => { 
    // Specifying the base url and api key
    // Not a great idea to store these in here NEED TO FIX
    const baseUrl = "http://api.weatherstack.com/"
    const apiKey = "a5bc0bb22e3e5a6ddc70ea9901ce0872"   

    // Constructing the request
    const apiUrl = `${baseUrl}current?access_key=${apiKey}&query=${location[0]},${location[1]}`

    // Making the request and returning the data via the callback function
    request({url: apiUrl, json: true}, (error, {body}) => {
        if(error){
            callback("Error with forecast", undefined)
        }
        else{
            callback(undefined, body)
        }
    })
}

module.exports = forecast
