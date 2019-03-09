let jsonPath = "./location.json";
let map;

var initMap = () => {
  let myLatLng = { lat: -25.363, lng: 131.044 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng
  });

  let marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Hello World!"
  });

  setInterval(updateMarkers, 2000);
};

let updateMarkers = () => {
  let oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);

      let locations = JSON.parse(this.responseText);

      for (let location of locations) {
        let contentStr = `
          <div>
            <h1>${location.name}</h1>
            <p>
              IP address: ${location.ip}<br>
              Time: ${location.time}<br>
              Latitude: ${location.lat}<br>
              Longitude: ${location.lng}<br>
            </p>
          </div>
        `;
        let infoWindow = new google.maps.InfoWindow({
          content: contentStr
        });

        let latLng = { lat: location.lat, lng: location.lng };
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Hello World!"
        });
        marker.addListener("click", function() {
          infoWindow.open(map, marker);
        });
      }
    }
  };

  oReq.open("GET", jsonPath, true);
  oReq.send();
};
