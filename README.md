# Lab 5: Pie and Stack Layouts

---


## Checkpoint 0: Margins and Axes

Follow the book and the in-class example to set up the margins and x/y axes for the line chart. This is essential practice on the use of generator functions and is useful in all four graded checkpoints of this lab.

![check_0.png](img/check_0.png)

## Checkpoint 1: Lines

In this checkpoint, you will focus on creating line-based visualizations using D3’s line() generator.

Starting from a provided dataset `weekly_temperature.csv`, create a basic line visualization using the example sequence of code in the D3 in Action textbook. Use D3 to generate the <path> element programmatically rather than writing SVG path commands manually. Your visualization should demonstrate that you can correctly map data values to x and y positions using scales, and that you understand how D3’s line generator translates data into geometry.

Your result should clearly show a continuous line connecting data points in order. The axes and margin specifications from Checkpoint 0 are required for this Checkpoint 1. You may choose other colors for the lines and circles in the visualization.

![check_1.png](img/check_1.png)

## Checkpoint 2: Areas
In this checkpoint, you will extend your line visualization by introducing curved interpolation and area fills.

First, modify your line generator to use at least two different curve types (for example, linear vs. basis or cardinal - there are a lot of options in [D3's curves package](https://d3js.org/d3-shape/curve)). Visually compare the results and confirm that your curves update correctly. You only need to select one type for this checkpoint.

Next, create an area visualization using D3’s area() generator. The area should surround the line based on the maximum and minimum temperatures for that week in NY. Your output should clearly demonstrate that you understand how area paths are constructed and how curve interpolation affects them.

Your final visualization should include at least one curved line from the average temp and one filled area derived from the max/min weekly temperatures. The book demonstrates the use of text labels - you may include them but they are not necessary.

![check_2.png](img/check_2.png)

## Checkpoint 3: Arcs and Radial Geometry

In this checkpoint, you will work with D3’s `arc()` generator to create shapes using polar coordinates.

Using the NY `daily_precipitations.csv` dataset, generate a set of arc segments arranged around a circle. The goal is to show the relative percentage of weeks that experienced precipitation as a part of the whole number of weeks in the dataset. I would prefer that you produce donut-like rings rather than a filled pie chart.

Your visualization should demonstrate:

-   Proper construction of arcs using D3
-   Correct mapping of data values to angles and/or radii
-   Thoughtful placement and spacing of arc segments

This checkpoint is intended to build conceptual intuition for radial layouts, which will be useful later when working with pie charts, radial trees, and circular network layouts.

![check_3.png](img/check_3.png)

## Checkpoint 4: Apply to a New Dataset

In this checkpoint, you will apply the ideas from the previous sections to a new dataset derived from the Open-Meteo API. Unlike the earlier checkpoints, this dataset has a more realistic structure and will require you to reason carefully about how to extract, transform, and encode the data.

You are provided with a preprocessed weather dataset containing hourly observations for a single location over multiple days. Each record includes time, temperature, and precipitation values.

Link: [Open-Meteo Weather API for Washington, DC](https://api.open-meteo.com/v1/forecast?latitude=38.89511&longitude=-77.03637&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=America%2FNew_York&past_days=14&temperature_unit=fahrenheit)

The code to load a json file into d3 is similar to the code that loads a .csv. Here is how you get started loading the file at the prepared link and printing the contents of the loaded object to console:

```javascript
d3.json('https://api.open-meteo.com/v1/forecast?latitude=38.89511&longitude=-77.03637&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=America%2FNew_York&past_days=14&temperature_unit=fahrenheit')
    .then(data => {
        console.log(data)
    })
```

Your task is to design and implement a visualization that communicates meaningful patterns in this data. At minimum, your visualization should:

-   Load and parse the dataset correctly.
-   Represent time along one axis and a quantitative variable along the other.
-   Use D3’s line or area generators to construct the primary visual encoding.
-   Apply appropriate scales and layout decisions to support interpretation.

Beyond these minimum requirements, you are encouraged to think carefully about what aspects of the data are most interesting and how best to communicate them visually.

You may choose to:
-   Compare multiple variables (e.g., temperature and precipitation),
-   Highlight daily cycles or longer-term trends,
-   Emphasize variability or extremes,
-   Or explore any other reasonable analytical goal.

There is no single correct design. The emphasis is on **thoughtful application of D3’s shape generators and sound visual encoding decisions**, not on producing a polished chart.
