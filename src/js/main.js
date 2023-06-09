(() => {
  let map = L.map('map').setView([51.052618, 3.724709], 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let marker;
  let clickedLocation;
  let locationDistance;
  let popup = L.popup();

  let randomLocation =
    locationsArr[Math.round(Math.random() * (locationsArr.length - 1))];

  function addImage(img) {
    let locationImage = document.getElementById('image');
    locationImage.src = `./img/${randomLocation.image}`;
  }

  addImage();

  function onMapClick(e) {
    let location =
      Math.round(e.latlng.distanceTo(randomLocation.coords)).toString() + 'm';
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
      .setContent('You clicked the map at ' + e.latlng.toString())
      .openOn(map);
    clickedLocation = e.latlng;
    locationDistance = location;
  }
  map.on('click', onMapClick);

  const submit = document.getElementById('submit');

  submit.addEventListener('click', (e) => {
    return [
      (marker = L.marker(randomLocation.coords).addTo(map)),
      setTimeout(() => {
        window.alert(
          'you guessed ' + locationDistance + ' away from the target'
        );
      }, '100'),
    ];
  });

  const next = document.getElementById('next');

  next.addEventListener('click', (e) => {
    return [
      map.removeLayer(marker),
      (randomLocation =
        locationsArr[Math.round(Math.random() * (locationsArr.length - 1))]),
      addImage(randomLocation.image),
    ];
  });
})();
