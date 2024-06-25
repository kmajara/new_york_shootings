# Interactive Data Visualization Project

This project provides an interactive platform for visualizing and analyzing shooting incident data. It leverages modern web technologies, including HTML, CSS, Bootstrap, and JavaScript, to create a user-friendly interface with various data processing and visualization tools.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Data Files and Sources](#data-files-and-sources)
- [Ethical Considerations](#ethical-considerations)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

The project is designed to offer multiple functionalities through an interactive web interface. Users can navigate through different sections such as Data Processing, Data Analysis, Interactive Graphs, and Interactive Maps. The carousel on the homepage provides an overview of each section, guiding users to explore further.

## Features

- **Home Page Navigation**: Buttons for easy navigation to different sections.
- **Carousel**: An interactive carousel to highlight key features and provide quick access to different sections.
- **Data Processing**: Information on data cleaning and storage approaches.
- **Data Analysis**: Detailed analysis of shooting incidents using Python and other libraries.
- **Interactive Graphs**: Graphs representing the data using Highcharts.
- **Interactive Maps**: Maps created using Bootstrap and other libraries to visualize the shooting data.

## Technologies Used

- **HTML5**
- **CSS3**
- **Bootstrap 5.3** (for webpage styling)
- **JavaScript**
- **Highcharts** (for interactive graphs)
- **Python** (for data analysis): For running the ipnyb file, you may have to install the folowing: 
		- pip install geoplot
		- pip install geojson
		- pip install pydeck
- **Py-Plex** (for Python data analysis)




## Data Files and Sources

We used the following files and data sources in our project:

- `NYC Shooting Incidents - Clean.csv`
- `NYC Shooting Incidents - JSON.json`
- `School Districts.geojson`
- `nyc_boros_clean.geojson`

Our main source of data was from [NYC Open Data](https://data.cityofnewyork.us/Public-Safety/NYPD-Shooting-Incident-Data-Historic-/833y-fsy8/about_data).

We reviewed these data sources for PII (Personally Identifiable Information) and confirmed that there was no PII present.

For creating filtering for Leaflet maps, we reviewed code from [this Stack Overflow post](https://stackoverflow.com/questions/73953616/multiple-dynamic-filter-for-leaflet-map).

To obtain coordinates for boroughs, we used [this resource from Cartography Vectors](https://cartographyvectors.com/map/508-new-york-city-boroughs-ny).

## Ethical Considerations

In our analysis and visualizations, we made considerations for bias and ethics by ensuring that all races represented in the data were treated equally and fairly. Our code reflects this commitment to unbiased and ethical handling of the data.

## Setup Instructions

To set up this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/kmajara/new_york_shootings/tree/master/ipynb
    ```
2. Navigate to the project directory:
    ```bash
    cd new_york_shootings/ipynb
    ```
3. Open the `index.html` file in your preferred web browser to view the project.

4. you might have to open a a local server for the maps in map.html to show. The following are the steps to achieve that: 
	a) Navigate to the folder containing the map.html and run: python3 -m http.server 8000 
	b) Open a this link in a new browser windwo: http://localhost:8000/
	c) The maps and related functionality should work then 

## Usage

- **Home**: Provides navigation to other sections.
- **About**: Learn more about the project.
- **Data Processing**: Details on how data is cleaned and stored.
- **Data Analysis**: Explore the analysis performed on the shooting incident data.
- **Interactive Graphs**: View interactive graphs representing the data.
- **Interactive Map**: Interact with maps that visualize the data geographically.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License


## Contact

If you have any questions or suggestions, feel free to contact me at [kops4jc@gmail.com](mailto:kops4jc@gmail.com).
