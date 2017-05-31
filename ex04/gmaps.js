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

   
    var geojson = {
        "type": "FeatureCollection",
        "features": [
            {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                [
                    [
                    118.30078125,
                    -24.287026865376422
                    ],
                    [
                    120.05859375,
                    -29.91685223307016
                    ],
                    [
                    125.859375,
                    -26.35249785815401
                    ],
                    [
                    123.3984375,
                    -21.616579336740593
                    ],
                    [
                    118.30078125,
                    -24.287026865376422
                    ]
                ]
                ]
            }
            },
            {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                [
                    [
                    135.791015625,
                    -22.512556954051437
                    ],
                    [
                    130.517578125,
                    -28.84467368077178
                    ],
                    [
                    141.15234374999997,
                    -32.39851580247401
                    ],
                    [
                    142.294921875,
                    -24.20688962239801
                    ],
                    [
                    135.791015625,
                    -22.512556954051437
                    ]
                ]
                ]
            }
            },
            {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                131.044921875,
                -18.81271785640776
                ]
            }
            }
        ]
        };

    map.data.addGeoJson(geojson);
    

}
