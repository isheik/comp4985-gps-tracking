let jsonPath = "./location.json";

let initMap = () => {
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
};

let readJSON = () => {
  let oReq = new XMLHttpRequest();

  oReq.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(this.responseText);
    }
  };

  oReq.open("GET", jsonPath, true);
  oReq.send();
};

readJSON();
