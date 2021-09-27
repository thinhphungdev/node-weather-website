const path = require("path")
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode.js');
const forecast = require('../utils/forecast.js');

const app = express();

// define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// set up handle bar and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Thinh Phung'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'About me',
        name: 'Thinh phung'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Thinh phung tam thuong'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address"
        })
    }

    geocode(req.query.address, (error, {lat, lon, country} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lat, lon, (error, forecastData) => {
            if (error) return res.send({error})

            res.send({
                forecast: forecastData,
                address: req.query.address,
                country
            })
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'Must provide search term'
        })
    }   

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404 page',
        message: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404 page',
        message: 'page not found!'
    });
})

app.listen(3000, () => console.log('server is up on port 3000'))
