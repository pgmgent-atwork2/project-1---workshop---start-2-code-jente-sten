let map = L.map('map').setView([51.052618, 3.724709], 12);

let marker = L.marker([51.043944, 3.725245]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let clickedLocation;
let popup = L.popup();

function onMapClick(e) {
  let location =
    Math.round(e.latlng.distanceTo([51.043944, 3.725245])).toString() + 'm';
  let locationLength = location.toString().length;
  if (locationLength > 4) {
    location =
      location.slice(0, locationLength - 4) +
      ',' +
      location.slice(locationLength - 4, locationLength - 3) +
      'km';
  }
  popup
    .setLatLng(e.latlng)
    .setContent(
      'You clicked the map at ' +
        e.latlng.toString() +
        'which is ' +
        location +
        ' away from the target'
    )
    .openOn(map);
  clickedLocation = e.latlng;
}

map.on('click', onMapClick);
