var map;
var geocoder;
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 3,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });
    
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow;

    google.maps.event.addListener(map, "click", function (event) {
        reverseGeocode({lat: event.latLng.lat(), lng: event.latLng.lng()});
    });
}

function geocode() {
    var endereco = document.getElementById("endereco").value;

    geocoder.geocode( { 'address': endereco}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        map.setZoom(10);
      } else {
        alert('Erro: ' + status);
      }
    });
}

function reverseGeocode(latlng) {
    geocoder.geocode( { 'location': latlng}, function(results, status) {
      if (status == 'OK') {
        if (results[1]) {
            var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
        }        
        
      } else {
        alert('Erro: ' + status);
      }
    });
}