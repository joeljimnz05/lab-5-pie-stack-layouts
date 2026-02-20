const drawStreamGraph = (data) => {
  const svg = d3.select("#streamgraph").append("svg")
    .attr("viewBox", [0, 0, width, height]);

  const innerChart = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  const formats = data.columns.filter(format => format !== "year");

  const stackGenerator = d3.stack()
    .keys(formats) 
    .offset(d3.stackOffsetWiggle)
    .order(d3.stackOrderInsideOut);

  const series = stackGenerator(data);

  const yScale = d3.scaleLinear()
    .domain([ d3.min(series, layer => d3.min(layer, d => d[0])) , 
          d3.max(series, layer => d3.max(layer, d => d[1]))])

    .range([innerHeight, 0]);

  const areaGenerator = d3.area()
    .x(d => xScale(d.data.year) + xScale.bandwidth() / 2)
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasis);

  innerChart.selectAll(".stream-layer")
    .data(series)
    .join("path")
      .attr("class", "stream-layer")
      .attr("d", areaGenerator)
      .attr("fill", d => colorScale(d.key));

  innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale)
      .tickValues(xScale.domain().filter(year => year % 5 === 0))
      .tickSize(-innerHeight)
    );
};