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

    // Cria uma instância do Wicket
    var wkt = new Wkt.Wkt();

    wkt.read("POLYGON((130.78125 -9.275622176792098,140.9765625 -9.622414142924805,136.40625 -30.44867367928756,132.01171875 -30.600093873550062,130.78125 -9.275622176792098))");
    var feature1 = {
        "type": "Feature",
        "geometry": wkt.toJson()
    };

   wkt.read("POLYGON((131.484375 -32.99023555965106,136.7578125 -32.99023555965106,136.7578125 -35.31736632923786,131.484375 -35.31736632923786,131.484375 -32.99023555965106))");   
   var feature2 = {
        "type": "Feature",
        "geometry": wkt.toJson()
    };

    wkt.read("POINT(134.6484375 -26.11598592533351)");
    var point1 = {
        "type": "Feature",
        "geometry": wkt.toJson()
    }

    wkt.read("POINT(144.140625 -32.54681317351514)");
    var point2 = {
        "type": "Feature",
        "geometry": wkt.toJson()
    }
    

    map.data.addGeoJson(feature1);
    map.data.addGeoJson(feature2);
    map.data.addGeoJson(point1);
    map.data.addGeoJson(point2);
    

}
