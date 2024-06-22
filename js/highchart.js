fetch('https://clarice2007.github.io/jsondata/NYC%20Shooting%20Incidents%20-%20JSON.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const processedData = [
            { year: 2006, queens: 80, brooklyn: 90, bronx: 70, manhattan: 60 },
            { year: 2010, queens: 110, brooklyn: 120, bronx: 100, manhattan: 70 },
            { year: 2014, queens: 140, brooklyn: 160, bronx: 130, manhattan: 110 },
            { year: 2018, queens: 100, brooklyn: 150, bronx: 120, manhattan: 80 },
            { year: 2019, queens: 120, brooklyn: 130, bronx: 110, manhattan: 90 },
            { year: 2020, queens: 130, brooklyn: 140, bronx: 115, manhattan: 95 }
        ];

        Highcharts.chart('line-chart-container', {
            title: {
                text: 'Total Occurrences by Borough Over the Years'
            },
            xAxis: {
                categories: processedData.map(data => data.year)
            },
            yAxis: {
                title: {
                    text: 'Total Occurrences'
                }
            },
            series: [
                { name: 'Queens', data: processedData.map(data => data.queens) },
                { name: 'Brooklyn', data: processedData.map(data => data.brooklyn) },
                { name: 'Bronx', data: processedData.map(data => data.bronx) },
                { name: 'Manhattan', data: processedData.map(data => data.manhattan) }
            ]
        });

        Highcharts.chart('radius-pie-container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Total Percent of Sum of vic_race from 2006 to 2021'
            },
            series: [{
                name: 'Race Percentage',
                data: [
                    { name: 'ASIAN AND WHITE', y: 25 },
                    { name: 'HISPANIC', y: 35 },
                    { name: 'BLACK', y: 40 }
                ],
                dataLabels: {
                    format: '{point.name}: {point.percentage:.1f}%'
                }
            }]
        });

        Highcharts.chart('pyramid-chart-container', {
            chart: {
                type: 'pyramid3d',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    depth: 50,
                    viewDistance: 50
                }
            },
            title: {
                text: 'Total Occurrences of vic_age_group for Different Boroughs Over the Years'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        allowOverlap: true,
                        y: 10
                    }
                }
            },
            series: [{
                name: 'Age Group',
                data: [
                    { name: 'Queens', y: 100 }, // Adjust the y values with the actual data
                    { name: 'Brooklyn', y: 120 },
                    { name: 'Bronx', y: 90 },
                    { name: 'Manhattan', y: 80 }
                ]
            }]
        });
    });
