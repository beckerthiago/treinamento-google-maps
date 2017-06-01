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
            waypts.push(markers[i].position);
        }
    }

    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: waypts,
        destinations: waypts,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            console.log(response);
        }        
    });

    directionsService.route({
          origin: origem,
          destination: destino,
          travelMode: 'DRIVING',
          waypoints: waypts,
          optimizeWaypoints: false
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