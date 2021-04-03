mapboxgl.accessToken = "PASTE YOUR ACCESS TOKEN HERE!";

// More info on the Geo Location API in the link below!
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  enableHighAccuracy: true
});

// If we manage to get our users location, we run this function
function onSuccess(position) {
  console.log("It's working! Latitude:", position.coords.latitude);
  console.log("It's working! Longitude:", position.coords.longitude);

  setupMap([position.coords.longitude, position.coords.latitude]);
}

// If the user refuses to share its location, we run this function instead
function onError() {
  console.log("The user doesn't want to be located! 👀");

  // We pass default coordinates to center our map somewhere chosen by us
  setupMap([42, -11]);
}

function setupMap(positionOfUser) {
  // Responsible for loading up the map
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: positionOfUser, // centering the app in the passed coords
    zoom: 15 // inital zoom level of the map
  });

  // Our custom markers coordinates and info
  // For more information check: https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: "Mapbox",
          description: "<a href='#'>Click me</a>"
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California"
        }
      }
    ]
  };

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  // Add directions plugin to the map
  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken
    }),
    "top-left"
  );

  // add markers to map
  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    const el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            "<h3>" + marker.properties.title + "</h3><p>" + marker.properties.description + "</p>"
          )
      )
      .addTo(map);
  });

  // CREATING CUSTOM MARKERS!
  // https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/
}
