let jsonPath = "./location.json";

var initMap = () => {
  let myLatLng = { lat: -25.363, lng: 131.044 };

  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng
  });

  let marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Hello World!"
  });

  updateMarkers();
};

let updateMarkers = () => {
  let oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);

      let locations = JSON.parse(this.responseText);

      for (let location of locations) {
        let latLng = { lat: location.lat, lng: location.lng };
        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Hello World!"
        });
      }
    }
  };

  oReq.open("GET", jsonPath, true);
  oReq.send();
};
