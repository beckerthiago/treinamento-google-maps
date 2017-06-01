var map;
var infowindow;
var camada;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 3,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        }
    });

    map.addListener('click', getFeature)

    infowindow = new google.maps.InfoWindow;

    var uso_multiplo = new geoambiente.maps.WmsLayer({
        url: "http://chi95a.itaipu:8080/wms",
        layer: 'ofpr:uso_multiplo',
        map: map
    });

    var abrangencia = new geoambiente.maps.WmsLayer({
        url: "http://chi95a.itaipu:8080/wms",
        layer: 'ofpr:abrangencia',
        map: map
    });

    camada = uso_multiplo;

    console.log(uso_multiplo);    
}

function getFeature(args) {
    var es = (map.getBounds().getSouthWest().toString()).replace(/[()]/g, '').split(", ");
			var ne = (map.getBounds().getNorthEast().toString()).replace(/[()]/g, '').split(", ");

			var url = "http://chi95a.itaipu:8080/wms";

			url = url.concat("?REQUEST=GetFeatureInfo");
			url = url.concat("&EXCEPTIONS=application/vnd.ogc.se_xml");
			url = url.concat("&BBOX=" + es[1] + "," + es[0] + "," + ne[1] + "," + ne[0]);
			url = url.concat("&X=" + parseInt(args.pixel.x));
			url = url.concat("&Y=" + parseInt(args.pixel.y));
			url = url.concat("&INFO_FORMAT=application/json");
			url = url.concat("&QUERY_LAYERS=" + camada.layerId);
			url = url.concat("&LAYERS=" + camada.layerId);
			url = url.concat("&SRS=EPSG:4674");
			url = url.concat("&WIDTH=" + map.getDiv().offsetWidth);
			url = url.concat("&HEIGHT=" + map.getDiv().offsetHeight);
			url = url.concat("&VERSION=1.1.1");

            $.ajax({
                url: url,
                method: 'GET'
            }).done(function (response) {
                infowindow.setPosition(args.latLng);
                infowindow.setContent(response.features[0].properties.ds_denominacao_ocupacao);
                infowindow.open(map);
                
            })
}