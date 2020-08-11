const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Luis Vasquez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Luis Vasquez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'What do you need help with?',
        title: 'Help',
        name: 'Luis Vasquez'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })
        })
    })

})





app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Luis Vasquez',
        errorText: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Luis Vasquez',
        errorText: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server initiated on port ' + port)
})