// Load data

Promise.all([
  d3.csv("data/data.csv", d3.autoType),
  d3.csv("data/films.csv", d3.autoType)
]).then(([data, films]) => {
  defineScales(data);
  drawDonutCharts(data);
  drawStackedBars(data);
  drawStreamGraph(data);
  addLegend();
  drawFilmsStreamGraph(films);
});