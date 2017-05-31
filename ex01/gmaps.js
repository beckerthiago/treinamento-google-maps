var map;
var traffic_layer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.1644},
        zoom: 8,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });

    traffic_layer =  new google.maps.TrafficLayer();

    map.addListener('zoom_changed', function () {
        console.log('zoom ');
    });
    
}

function zoom_changed() {
    var select_zoom = document.getElementById("zoom");
    var zoom_value = select_zoom[select_zoom.selectedIndex].value;

    map.setZoom(parseInt(zoom_value));
}

function basemap_changed() {
    var select_maptype = document.getElementById("base_map");
    var maptype = select_maptype[select_maptype.selectedIndex].value;
    console.log(maptype);
    map.setMapTypeId(maptype);
}

function traffic_changed() {
    var select_traffic = document.getElementById("transito");
    var show_traffic = select_traffic[select_traffic.selectedIndex].value;

    console.log(show_traffic);
    if (show_traffic == "true") {
        traffic_layer.setMap(map);        
    }
    else {
        traffic_layer.setMap(null);
    }
}

function lat_changed() {
    var lat = parseInt(document.getElementById("lat").value);
    var lng = map.getCenter().lng();
    var latlng = {lat: lat, lng: lng}
    map.setCenter(latlng);
}

function lng_changed() {
    var lat = parseInt(document.getElementById("lng").value);
    var lng = map.getCenter().lat();
    var latlng = {lat: lat, lng: lng}
    map.setCenter(latlng);
}