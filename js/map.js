// Create the map object centered on New York City
let myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 11
});

// Add the tile layer that will serve as background
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Paths to the local JSON files
let shootingDataPath = 'Resources/NYC Shooting Incidents - JSON.json';
let geojsonPath = 'Resources/nyc_boros_clean.geojson';

// Load the data with d3
d3.json(shootingDataPath).then(function(data) {
    // Create a new marker cluster group
    let markers = L.markerClusterGroup();

    // Aggregate data by borough 
    let boroughCounts = {};

    // Loop through the data
    data.features.forEach(function(feature) {
        // Set the data location property to a variable
        let location = feature.geometry.coordinates;
        let boro = feature.properties.BORO;

        // Initialize boro count if not already done
        if (!boroughCounts[boro]) {
            boroughCounts[boro] = 0;
        }
        boroughCounts[boro]++;

        // Check for the location property
        if (location) {
            // Add a new marker to the cluster group, and bind a popup
            markers.addLayer(L.marker([location[1], location[0]])
                .bindPopup(`
                    <b>Incident Key:</b> ${feature.properties.INCIDENT_KEY}<br>
                    <b>Date:</b> ${feature.properties.OCCUR_DATE}<br>
                    <b>Time:</b> ${feature.properties.OCCUR_TIME}<br>
                    <b>Borough:</b> ${feature.properties.BORO}<br>
                    <b>Perpetrator Age Group:</b> ${feature.properties.PERP_AGE_GROUP}<br>
                    <b>Perpetrator Sex:</b> ${feature.properties.PERP_SEX}<br>
                    <b>Perpetrator Race:</b> ${feature.properties.PERP_RACE}<br><br>
                    <b>Victim Age Group:</b> ${feature.properties.VIC_AGE_GROUP}<br>
                    <b>Victim Sex:</b> ${feature.properties.VIC_SEX}<br>
                    <b>Victim Race:</b> ${feature.properties.VIC_RACE}
                `));
        }
    });

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

    // Create the Choropleth map 
    let choroplethMap = L.map("choroplethMap", {
        center: [40.7, -73.95], 
        zoom: 11
    }); 

    // Add the tile layer to the choropleth map 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(choroplethMap);

    // Load geoJson Data for borough boundaries 
    d3.json(geojsonPath).then(function(geojsonData) {
        // Define color scale
        function getColor(d) {
            return d > 10000 ? '#800026' :
                   d > 5000  ? '#BD0026' :
                   d > 2000  ? '#E31A1C' :
                   d > 1000  ? '#FC4E2A' :
                   d > 500  ? '#FD8D3C' :
                   d > 200   ? '#FEB24C' :
                   d > 100   ? '#FED976' :
                              '#FFEDA0';

        }
        // Establish style for each feature/boro 
        function style(feature) {
            return {
                fillColor: getColor(boroughCounts[feature.properties.name]),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };
        }
        // ************************************/
        // Add interaction to the CHoropleth Map
        //************************************/
        
        //Define an event listener for layer mouseover event and bring it to the front
        function highlightFeature(e) {
            var layer = e.target;
        
            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });
        
            layer.bringToFront();
        }

        //Define action on mouseout. Reset layer style to default state
        function resetHighlight(e) {
            geojson.resetStyle(e.target);
        }

        //Define a click listener that zooms to the selected borough
        function zoomToFeature(e) {
            choroplethMap.fitBounds(e.target.getBounds());
        }

        //Define a function to run on each feature
        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        // Create the GeoJSON layer with the style and add it to the map
        geojson = L.geoJson(geojsonData, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(choroplethMap);

        // Add legend to the map
        let legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
            let div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 100, 200, 500, 1000, 2000, 5000, 10000],
                labels = [];

                // loop through our density intervals and generate a label with a colored square for each interval
                for (let i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }
                    return div;

    
        };
        // Add legend to the ChoroplethMap
        legend.addTo(choroplethMap);
    });
});
