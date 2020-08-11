const request = require('request')

const forecast = (latitude, longitude, callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=d02e84a95811ee3594f3f73d7e261c70&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callBack('Unable to reach location services!', undefined)
        } else if (body.error) {
            callBack('Invalid coordinates!!', undefined)
        } else {
            callBack(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 
            ' degrees out, but it feels like ' + body.current.feelslike + ' degrees. The humidity outside is around ' + body.current.humidity + 
            '. There is '  + body.current.precip + '% chance of rain!')
        }  
    })
}

module.exports = forecast