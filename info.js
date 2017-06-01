function getAtributosCamada(camada, service, args, urlgeoserver, listener, filtroCamadas) {
			var periodo = filtroCamadas.periodo;
			var ano = filtroCamadas.ano;
			var decendio = filtroCamadas.decendio;

			mapListener = listener;
			var es = (service.getMap().getBounds().getSouthWest().toString()).replace(/[()]/g, '').split(", ");
			var ne = (service.getMap().getBounds().getNorthEast().toString()).replace(/[()]/g, '').split(", ");

			var url = urlgeoserver;

			url = url.concat("?REQUEST=GetFeatureInfo");
			url = url.concat("&EXCEPTIONS=application/vnd.ogc.se_xml");
			url = url.concat("&BBOX=" + es[1] + "," + es[0] + "," + ne[1] + "," + ne[0]);
			url = url.concat("&X=" + parseInt(args.pixel.x));
			url = url.concat("&Y=" + parseInt(args.pixel.y));
			url = url.concat("&INFO_FORMAT=application/json");
			url = url.concat("&QUERY_LAYERS=" + camada[0].camada.layerId);
			url = url.concat("&LAYERS=" + camada[0].camada.layerId);
			url = url.concat("&SRS=EPSG:4674");
			url = url.concat("&WIDTH=" + service.getMap().getDiv().offsetWidth);
			url = url.concat("&HEIGHT=" + service.getMap().getDiv().offsetHeight);
			url = url.concat("&porpertyName=" + camada[0].atributosInfowindow);
			url = url.concat("&VERSION=1.1.1");

			tocDirectiveApiService.getAtributosCamada(url).then(function(result) {

				if (result.data.features.length > 0) {
					if (camada[0].camada.layerId.indexOf('marcha_soja') != -1) {

						var estado = result.data.features[0].properties["Sigla do Estado do Município"];
						var gid = result.data.features[0].properties.gid;

						tocDirectiveApiService.getAtributosMarchaCultura(estado, decendio, gid).then(function(result) {
							if (result.data.listaMarchaCultura[0]) {
								service.adicionarInfoWindow("client/modules/balaoinformacao/views/balaoinformacao.html", service.getMap(), args.latLng, result.data.listaMarchaCultura[0], infowindow).then(function(result) {
									infowindow = result;
								});
							}
							return result;
						});

					} else if (camada[0].camada.layerId.indexOf('marcha_agricultura') != -1) {

						var gidAgricultura = result.data.features[0].properties.gid;
						var estadoAgricultura = result.data.features[0].properties['Sigla do Estado do Município'];

						tocDirectiveApiService.getAtributosMarchaAgricultura(gidAgricultura, ano, periodo, estadoAgricultura).then(function(result) {
							if (result.data.listaMarchaAgricultura[0]) {
								service.adicionarInfoWindow("client/modules/balaoinformacao/views/balaoinformacao.html", service.getMap(), args.latLng, result.data.listaMarchaAgricultura[0], infowindow).then(function(result) {
									infowindow = result;
								});
							}
							return result;
						});

					} else {
						service.adicionarInfoWindow("client/modules/balaoinformacao/views/balaoinformacao.html", service.getMap(), args.latLng, result.data.features[0], infowindow).then(function(result) {
							infowindow = result;
						});
					}
				}
				return result;
			});
		}