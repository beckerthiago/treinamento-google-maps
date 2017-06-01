var map;
var markers = [];
var directionsService;
var directionsDisplay;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 3,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });

     google.maps.event.addListener(map, "click", function (event) {
        addMarker({lat: event.latLng.lat(), lng: event.latLng.lng()});
    });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
}

function calcularRota() {
    var origem = document.getElementById("origem").value;
    var destino = document.getElementById("destino").value;
    
    waypts = [];

    if (markers.length > 0) {
        for (i = 0; i < markers.length; i++) {
            waypts.push({
                location: markers[i].position,
                stopover: true
            });
        }
    }

    var optimize = document.getElementById("otimizada").value == "True" ? true : false;

    directionsService.route({
          origin: origem,
          destination: destino,
          travelMode: 'DRIVING',
          waypoints: waypts,
          optimizeWaypoints: optimize
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
    });
}

function addMarker(center) {
    
    var marker = new google.maps.Marker({
          position: center,
          map: map
    });

    markers.push(marker);
}