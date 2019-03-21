/*------------------------------------------------------------------------------------------------------------------
-- SOURCE FILE: script.js - Google Map script - A script displays Google Map and plot markers on it 
--                                              reading the information read from a file 
--
-- PROGRAM: script
--
-- FUNCTIONS:
-- initMap()
-- setMapOnAll(map)
-- updateMarkers()
--
-- DATE: March 21, 2019
--
-- REVISIONS:
--
-- DESIGNER: Keishi Asai
--
-- PROGRAMMER: Keishi Asai
--
-- NOTES:
-- The script displays Google Map by using GoogleMap API. Also, the script regularly reads a file and retrive
-- client location information from it. Those read location information is plotted as markers on the Google Map.
----------------------------------------------------------------------------------------------------------------------*/
let jsonPath = "./data.JSON";
let queryParams = "?" + new Date().getTime();
let url = jsonPath + queryParams;
let map;
let markers = [];
let clntContainer = document.getElementById("clients-container");


/*------------------------------------------------------------------------------------------------------------------
-- FUNCTION: initMap
--
-- DATE: March 21, 2019
--
-- REVISIONS:
--
-- DESIGNER: Keishi Asai
--
-- PROGRAMMER: Keishi Asai
--
-- INTERFACE: initMap ()
--
-- RETURNS: undefined
--
-- NOTES:
-- A callback function provided by Google Map API. This is triggered when Google Map script is loaded
-- and become ready to use. Set BCIT latitude and longitude as the initial display point of the Google Map
-- and set interval function call for updateMarkers functoin.
----------------------------------------------------------------------------------------------------------------------*/
var initMap = () => {
  let bcitLatLng = { lat: 49.249896, lng: -123.001553 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: bcitLatLng
  });

  setInterval(updateMarkers, 2000);
};


/*------------------------------------------------------------------------------------------------------------------
-- FUNCTION: setMapOnAll
--
-- DATE: March 21, 2019
--
-- REVISIONS:
--
-- DESIGNER: Keishi Asai
--
-- PROGRAMMER: Keishi Asai
--
-- INTERFACE: setMapOnAll ()
--
-- RETURNS: undefined
--
-- NOTES:
-- An utility function to plot all markers in the markers array on the Google Map.
----------------------------------------------------------------------------------------------------------------------*/
let setMapOnAll = map => {
  for (let marker of markers) {
    marker.setMap(map);
  }
};


/*------------------------------------------------------------------------------------------------------------------
-- FUNCTION: updateMarkers
--
-- DATE: March 21, 2019
--
-- REVISIONS:
--
-- DESIGNER: Keishi Asai
--
-- PROGRAMMER: Keishi Asai
--
-- INTERFACE: updateMarkers ()
--
-- RETURNS: undefined
--
-- NOTES:
-- A function called regularly. This function reads client location information from a file and
-- displays the read location information on the Google Map and on the web page.
----------------------------------------------------------------------------------------------------------------------*/
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

  oReq.open("GET", url, true);
  oReq.send();
};
