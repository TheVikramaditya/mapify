'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(

        function success(position) {
            console.log(position.coords.latitude)
            console.log(position)
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            const coords = [latitude, longitude]
            const map = L.map('map').setView(coords, 12);//50 zoom in or out

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker(coords).addTo(map)
                .bindPopup('You are here')
                .openPopup();

            //on is coming from leaflet
            map.on('click', function (mapEvent) {
                const { lat, lng } = mapEvent.latlng;
                console.log(mapEvent.latlng)
                L.marker([lat, lng]).addTo(map)
                    .bindPopup(`${mapEvent.latlng}`)
                    .openPopup()

            })
        },
        function notSuccess(position) {
            console.log('position not found')
            alert('position not found')
        }
    );

}

// https://www.google.com/maps/place/New+Delhi,+Delhi/@28.527582,77.0688992,11z