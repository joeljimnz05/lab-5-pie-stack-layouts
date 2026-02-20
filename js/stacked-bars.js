const drawStackedBars = (data) => {
  // Generate the stacked bar chart here
  

  /*******************************/
  /*    Append the containers    */
  /*******************************/
  const svg = d3.select("#bars").append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const stackGenerator = d3.stack()
    .keys(formatsInfo.map(f => f.id))
    .order(d3.stackOrderDescending)
    .offset(d3.stackOffsetExpand);

  const annotatedData = stackGenerator(data);

  const minLowerBoundaries = [];
  const maxUpperBoundaries = [];
  annotatedData.forEach(series => { 
    minLowerBoundaries.push(d3.min(series, d => d[0]));
    maxUpperBoundaries.push(d3.max(series, d => d[1]));
  })

  const yScale = d3.scaleLinear()
    .domain([d3.min(minLowerBoundaries), d3.max(maxUpperBoundaries)])
    .range([innerHeight, 0]);

  annotatedData.forEach(series => {
    innerChart.selectAll(`.bar-${series.key}`)
      .data(series)
      .join("rect")
        .attr("class", d => `bar-${series.key}`)
        .attr("x", d => xScale(d.data.year))
        .attr("y", d => yScale(d[1]))
        .attr("height", d => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("fill", colorScale(series.key));
  });

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale)
      .tickValues(d3.range(1975, 2020, 5))
      .tickSizeOuter(0)
    );

  innerChart.append("g")
    .call(d3.axisLeft(yScale)
      .tickFormat(d3.format(".0%"))
      .tickSizeOuter(0)
  );

};