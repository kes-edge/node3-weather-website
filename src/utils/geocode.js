const request = require('request')

const geocode = (location, callback) => {
    const mapApiKey = "pk.eyJ1Ijoia2VzZWRnZTk0IiwiYSI6ImNsdHp5bTNnbzA1cTgyaXMzdTh4dWdrOXAifQ.-fZN742hXMAA6IFEd4ifmw"
    const baseMapApiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    const mapUrl = `${baseMapApiUrl}${location}.json?access_token=${mapApiKey}`
    console.log(mapUrl)

    request({url: mapUrl, json: true}, (error, {body}) => {
        if (error){
            callback("unable to connect", undefined)
        } else if (body.features.length === 0) {
            callback("unable to find location", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode