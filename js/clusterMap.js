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


// Load the data with d3
d3.json(shootingDataPath).then(function(data) {
    // Total number of incidents, to be used later for percentange calculations
    const totalIncidents = data.features.length;

    // Create a new marker cluster group
    let markers = L.markerClusterGroup();

    // Function to filter data based on user input
    function filterData() {
        let filteredData = data.features.filter(function(feature) {
            let boroFilter = document.getElementById('boroughFilter').value;
            let startDateFilter = document.getElementById('startDateFilter').value;
            let endDateFilter = document.getElementById('endDateFilter').value;
            let perpRaceFilter = document.getElementById('perpRaceFilter').value;
            let perpAgeGroupFilter = document.getElementById('perpAgeGroupFilter').value;
            let perpSexFilter = document.getElementById('perpSexFilter').value;
            let vicRaceFilter = document.getElementById('vicRaceFilter').value;
            let vicAgeGroupFilter = document.getElementById('vicAgeGroupFilter').value;
            let vicSexFilter = document.getElementById('vicSexFilter').value;

            // Filter conditions: sets filtercondition to equal both conditions (true filter Condition and filtered items.)
            let filterCondition = true;
            if (boroFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.BORO === boroFilter;
            }
            if (startDateFilter) {
                filterCondition = filterCondition && new Date(feature.properties.OCCUR_DATE) >= new Date(startDateFilter);
            }
            if (endDateFilter) {
                filterCondition = filterCondition && new Date(feature.properties.OCCUR_DATE) <= new Date(endDateFilter);
            }
            if (perpRaceFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.PERP_RACE === perpRaceFilter;
            }
            if (perpAgeGroupFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.PERP_AGE_GROUP === perpAgeGroupFilter;
            }
            if (perpSexFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.PERP_SEX === perpSexFilter;
            }
            if (vicRaceFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.VIC_RACE === vicRaceFilter;
            }
            if (vicAgeGroupFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.VIC_AGE_GROUP === vicAgeGroupFilter;
            }
            if (vicSexFilter !== 'all') {
                filterCondition = filterCondition && feature.properties.VIC_SEX === vicSexFilter;
            }

            return filterCondition;
        });

        return filteredData;
    }

    // Function to update markers based on filtered data
    function updateMarkers() {
        markers.clearLayers();

        // Get filtered data
        let filteredData = filterData();

        // Loop through the filtered data and add markers. Does not use the indivividual coordinates, but rather the geometry to access the coordinates. 
        filteredData.forEach(function(feature) {
            let location = feature.geometry.coordinates;
            if (location) {
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

        // Add updated markers to map
        myMap.addLayer(markers);

        // Update the selection percentage
        updateSelectionPercentage(filteredData.length);
    }

    // Function to update the percentage of selected incidents
    function updateSelectionPercentage(filteredCount) {
        let percentage = (filteredCount / totalIncidents) * 100;
        document.getElementById('selectionPercentageButton').textContent = `Your selection is ${percentage.toFixed(2)}% of total incidents`;
    }

    // Initial load of markers and percentage
    updateMarkers();

    // Function to handle filter button click
    window.filterMap = function() {
        markers.clearLayers();
        updateMarkers();
    };
});
