// setting graph dimensions and margins
var margin = {top: 60, right: 120, bottom: 70, left: 120},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%b-%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);

// define the UK line
var ukline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.uk); });

// define the London line
var londonline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.london); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("folder_datasets/workforce.csv", function(error, data) {
    if (error) throw error;

  // format the data
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.uk = +d.uk;
        d.london = +d.london;
    });

  // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y0.domain([0, d3.max(data, function(d) {return Math.max(d.uk);})]);
    y1.domain([0, d3.max(data, function(d) {return Math.max(d.london); })]);

  // Add the ukline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "black")
        .attr("d", ukline);

  // Add the londonline path with separate styling
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "darkgray")
        .attr("d", londonline);

  // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  // Add the Y0 Axis
    svg.append("g")
        .attr("class", "ukaxis")
        .call(d3.axisLeft(y0));

  // Add the Y1 Axis
    svg.append("g")
        .attr("class", "londonaxis")
        .attr("transform", "translate( " + width + ", 0 )")
        .call(d3.axisRight(y1));
    
  // the graph title, x and y axes implement the use of the <text> element in the svg format in html as well their respective attributes
  // x axis label
    svg.append("text")             
        .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
        .style("text-anchor", "middle") 
        .text("Year");

  // y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Workforce Jobs in the UK");

  // y axis label
    svg.append("text")
        .attr("transform", "rotate(90)")
        .attr("y", 0 - (width + margin.right))
        .attr("x",0 + (height/2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Workforce Jobs in London");
    
  // graph title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Workforce Jobs");

});