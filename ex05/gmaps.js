var map;

var markers = [];
var markerCluster = null;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.1644},
        zoom: 1,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });
}

function addMarker() {

    var latlng = {
        lat: parseFloat(document.getElementById("lat").value),
        lng: parseFloat(document.getElementById("lng").value)
    };

    var select_color = document.getElementById("select_icon");
    var icon_url = select_color[select_color.selectedIndex].value;

    console.log(latlng);
    var marker = new google.maps.Marker({
          position: latlng,
          map: map,
          icon: icon_url          
    });

    markers.push(marker);
}

function removeAll() {
    for (i = 0; i <= markers.length; i++) {
        markers[i].setMap(null);
    }
}

function viewchange() {
    var select_view = document.getElementById("view")
    var view = select_view[select_view.selectedIndex].value;

    if (view == 1) {
        // cluster

        markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
    else if (view == 0 && markerCluster != null) {
        markerCluster.removeMarkers(markers, false);
        for (i = 0; i <=markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    else if (view == 2) {
        // heatmap
    }
}