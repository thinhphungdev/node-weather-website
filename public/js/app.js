const search = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

const getWeatherData = () => {
    const location = search.value;
    message2.textContent = 'Loading...' 
    
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            message2.textContent = data.error;
        } 
        else {
            const {address, country, forecast} = data
            message1.textContent = `${address[0].toUpperCase() + address.slice(1)} from ${country}`
            message2.textContent = forecast
        }
    })
    .catch(error => console.error(error))
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    getWeatherData();
})