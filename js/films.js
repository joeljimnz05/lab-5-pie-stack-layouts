const drawFilmsStreamGraph = (data) => {
    const svg = d3.select("#films").append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const genres = [...new Set(data.map(d => d.genre))].sort();
    const years = [...new Set(data.map(d => d.year))].sort();

    const wideData = years.map(year => {
        const formattedData = { year: year };
        genres.forEach(genre => {
            const match = data.find(d => d.year === year && d.genre === genre);
            formattedData[genre] = match ? +match.inflation_adjusted_gross : 0;
        });
        return formattedData;
    });

    const stackGenerator = d3.stack()
        .keys(genres)
        .offset(d3.stackOffsetWiggle)
        .order(d3.stackOrderInsideOut);
    
    const series = stackGenerator(wideData);

    const xScale = d3.scaleLinear()
        .domain(d3.extent(years))
        .range([0, innerWidth]);    

    const yScale = d3.scaleLinear()
        .domain([d3.min(series, layer => d3.min(layer, d => d[0])) , 
                d3.max(series, layer => d3.max(layer, d => d[1]))])
        .range([innerHeight, 0]);

    const filmColorScale = d3.scaleOrdinal()
        .domain(genres)
        //color scale using D3's built-in 10-color Tableau palette
        .range(d3.schemeTableau10);

    const areaGenerator = d3.area()
        .x(d => xScale(d.data.year))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveBasis);

    innerChart.selectAll(".film-layer")
        .data(series)
        .join("path")
            .attr("class", "film-layer")
            .attr("d", areaGenerator)
            .style("fill", d => filmColorScale(d.key))
            .attr("opacity", 0.9);

    innerChart.append("g").attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale)
            .tickFormat(d3.format("d"))
            .tickValues(d3.range(1995, 2019, 5))
            .tickSize(-innerHeight)
        );

    addFilmLegend(genres, filmColorScale);
    
    };