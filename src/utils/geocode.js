const request = require('request')

const geocode = (address, callBack) => {
    const url = 'http://api.mapbox.com./geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHZhc3F1ZXo2OTAiLCJhIjoiY2tkb2Noajl5MGpocjJ1cWp6bjloc2V0MCJ9.tB8UJ8gxrM31BPHHG3JqEg'
    
    request({ url, json: true }, (error, { body } = {} ) => {
        if (error) {
            callBack('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callBack('Unable to find location! Try another search.', undefined)
        }
        else {
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode