var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.1644},
        zoom: 8,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });
}

function style_changed() {
    var new_style = document.getElementById('stylearea').value;
    var styledMapType = new google.maps.StyledMapType(JSON.parse(new_style));
    
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}