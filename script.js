let jsonPath = "./location.json";
let map;
let markers = [];
let clntContainer = document.getElementById("clients-container");

var initMap = () => {
  authUser();
};

let setMapOnAll = map => {
  for (let marker of markers) {
    marker.setMap(map);
  }
};

let updateMarkers = () => {
  let oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let locations = JSON.parse(this.responseText);
      let clientsHTML = "";

      setMapOnAll(null);

      for (let location of locations) {
        let contentStr = `
          <div>
            <h3>${location.name}</h3>
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
          title: location.name
        });
        marker.addListener("click", function() {
          infoWindow.open(map, marker);
        });
        markers.push(marker);
        clientsHTML += contentStr;
      }
      clntContainer.innerHTML = clientsHTML;
    }
  };

  oReq.open("GET", jsonPath, true);
  oReq.send();
};

let authUser = () => {
  let authUrl = "./auth.json";
  let oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let passwd = JSON.parse(this.responseText).passwd;
      let input;

      do {
        input = prompt("Type in password for this page");
      } while (input != passwd);

      let bcitLatLng = { lat: 49.249896, lng: -123.001553 };

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: bcitLatLng
      });

      setInterval(updateMarkers, 2000);
    }
  };

  oReq.open("GET", authUrl);
  oReq.send();
};
