const addLegend = (genres, filmColorScale) => {
  // Create the legend here

  const container = d3.select(".legend-container").append("div")
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("justify-content", "center")
    .style("gap", "16px")
    .style("margin", "12px 0");

  formatsInfo.forEach( f => {
    const item = container.append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "6px");

    item.append("div")
      .style("width", "14px")
      .style("height", "14px")
      .style("background-color", colorScale(f.id))
      .style("border-radius", "3px");

    item.append("span")
      .style("font-size", "13px")
      .style("color", "#444")
      .text(f.label);

  });
  };

  const addFilmLegend = (genres, filmColorScale) => {

  const container = d3.select(".film-legend-container").append("div")
    .style("display", "flex")
    .style("flex-wrap", "wrap")
    .style("justify-content", "center")
    .style("gap", "16px")
    .style("margin", "12px 0");

  genres.forEach(g => {
    const item = container.append("div")
      .style("display", "flex")
      .style("align-items", "center")
      .style("gap", "6px");

    item.append("div")
      .style("width", "14px")
      .style("height", "14px")
      .style("background-color", filmColorScale(g))
      .style("border-radius", "3px");

    item.append("span")
      .style("font-size", "13px")
      .style("color", "#444")
      .text(g);
  });
};