// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// call the data
d3.csv('folder_datasets/percentageGoingUniversity.csv', function(error, data) {
  if (error) throw error;

  // format the data in an increasing fashion
  data.forEach(function(d) {
    d.percentageGoingUniversity = +d.percentageGoingUniversity;
  });

  // Map the data onto the x,y domains then scale them respectively
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.percentageGoingUniversity; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.percentageGoingUniversity); })
      .attr("height", function(d) { return height - y(d.percentageGoingUniversity); });

  // append the x Axis to the bottom of the svg via axisBottom
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // append the y Axis to the left of the svg via axisLeft
  svg.append("g")
      .call(d3.axisLeft(y));

});
