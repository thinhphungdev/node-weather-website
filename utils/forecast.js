const request = require("request");

// cb params cb(err, res)
const forecast = (lat, long, cb) => {
    const URL = `http://api.weatherstack.com/current?access_key=0e7c3d0a594ee7f883d4be798c68a030&query=${lat},${long}&units=f`;
    
    request({url: URL, json: true}, (err, res) => {
        if (err) cb('unable to connect to location services.', null);
        else if (res.body.error) cb('unable to find location', null);
        else {
            const current = res.body.current;
            const {temperature, feelslike, weather_descriptions} = current;

            cb(null, `${weather_descriptions[0]}. It is currently ${temperature} degress out. And feels like ${feelslike} degress out.`)
        }
    })
};

module.exports = forecast;