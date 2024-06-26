const express = require('express')
const path = require('path')
const fs = require('fs')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Creating a new express application
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App',
        author: 'Kieran Edge'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help', 
    })
})

app.get('/about', (req,res) =>{
    res.render('about')
})

app.get('/weather', (req, res) => {
    // Return an error if no address is provided
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    // Get the forecast for the address provided
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error});
        }

        forecast([latitude, longitude], (error, forecastData) => {
            if (error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData.current.weather_descriptions[0],
                location: location,
                address: req.query.address
            });
        });
    });
});


app.get('/products', (req,res) =>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// Wildcard handler for 404 pages
app.get('/help/*', (req,res) =>{
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('error', {
        errorMessage: 'URL not defined'
    })
})


app.listen(port, () => {
    console.log("Server is running on port " + port)
})
