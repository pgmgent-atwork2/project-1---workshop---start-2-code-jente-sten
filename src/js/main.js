let map = L.map('map').setView([51.052618, 3.724709], 12);

let marker = L.marker([51.043944, 3.725245]).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

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
}

map.on('click', onMapClick);

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2 - lat1); // deg2rad below
  let dLon = deg2rad(lon2 - lon1);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
