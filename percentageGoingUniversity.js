// set the dimensions and margins of the graph
var margin = {top: 60, right: 20, bottom: 80, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

var div = d3.select("body").append("div")
    .attr("class", "interactivebox2")
    .style("opacity", 0);
          
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
d3.csv("folder_datasets/percentageGoingUniversity.csv", function(error, data) {
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
        .attr("height", function(d) { return height - y(d.percentageGoingUniversity); })
        .on("mousemove", function(d) {
        div.transition()
         // mouse over transition faster than mouse out transition
            .duration(200)
            .style("opacity", .7);
        div.html(d.percentageGoingUniversity + "%")
         // style the box so that it appears to the right and above the cursor/pointer
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
     // when the mouse is moved away from the bar, the opacity becomes 0 in 500ms
        .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
        });

  
  // append the x Axis to the bottom of the svg via axisBottom
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  // append the y Axis to the left of the svg via axisLeft
    svg.append("g")
        .call(d3.axisLeft(y));
  
  // x axis label
    svg.append("text")             
        .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 7) + ")")
        .style("text-anchor", "middle") 
        .text("Year");
    
  // y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Percentage (%) of Students");
    
  // graph title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Percentage of Students Pursuing Further Education");

});