# DWD Daten Abfrage für einen Punkt

## Beispiel Link

https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=text%2Fjavascript&viewparams=observed_property_code:GRD_DEU_P1D_BF-GRB;location:POINT(8.5+52.06);srid:4326;begin_position:2023-08-07T00:00:00Z;end_position:2023-09-06T23:59:59Z;srid_out:4.326;regexp:true

### `Aufbau`

#### `Koordinaten `

https...POINT(8.5+52.06)...true

Über POINT können Koordinaten eingegeben werden.\
Die kleinste Änderung ist zwei Stellen nach dem Komma, also 0.01.

#### `Anfangsdatum und Enddatum`

Anfangsdatum: https...begin_position:2023-08-07T00:00:00Z;...true \
Enddatum: https...end_position:2023-09-06T23:59:59Z;...true

Am besten wird ein Zeitraum von 31 Tagen gewählt.

### `Besonderheiten`

Es besteht auch möglich, die Abfrage zum einem als JSON zu machen, indem man das "outputformat" zu "application/json" ändert. Die ausgegebenen Punkte haben keine Geometry Werte bzw sind null:

https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue

Alternativ kann man den Geometry Werten auch einen Type und Koordinaten geben, indem "&propertyname=OBSERVED_PROPERTY_CODE%2CRESULT_TIME%2CRESULT" weggelassen wird:

https://cdc.dwd.de/geoserver/CDC/ows?&service=WFS&version=2.0.0&request=GetFeature&typenames=CDC%3AGRD_DEU_API.GET_FEATURE_INFO&outputformat=application/json&viewparams=observed_property_code%3AGRD_DEU_P1D_BF-GRB%3Blocation%3APOINT(8.37+52.07)%3Bsrid%3A4326%3Bbegin_position%3A2023-06-23T00%3A00%3A00Z%3Bend_position%3A2023-07-23T23%3A59%3A59Z%3Bsrid_out%3A4.326%3Bregexp%3Atrue
