const request = require('request');

// cb params: (err, res)
const geocode = (address, cb) => {
    const URL = `http://api.weatherstack.com/current?access_key=0e7c3d0a594ee7f883d4be798c68a030&query=${address}`;

    request({url: URL, json: true}, (error, res) => {
        if (error) cb('unable to connect to location services.', undefined)
        else if (res.body.error) cb('unable to find LOCATION', undefined)
        else {
            const current = res.body.location;
            // const { lat, lon, name, country } = current;

            // console.log(`City ${name} from ${country} and its lat: ${lat} city's long: ${lon} `)
        
            cb(undefined, current);
        }
    })
};

module.exports = geocode;
