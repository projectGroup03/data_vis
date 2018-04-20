var Obesity = function() {
    this.creation = function() {
        // setting graph dimensions and margins
        var margin = {top: 40, right: 20, bottom: 70, left: 70},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // setting the ranges of x and y
        var x = d3.scaleBand()
                  .range([0, width])
                  .padding(0.1);
        var y = d3.scaleLinear()
                  .range([height, 0]);

        // append the svg (Scalable Vector Graphics) object to the body of the page
        // append an element acting as a 'group' to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

        // import the data
        d3.csv("folder_datasets/obesity.csv", function(error, data) {
          // the throw statement allows for the creation of a custom error
            if (error) throw error;

          // format the data
          //'forEach' iterates over the data
            data.forEach(function(d) {
            // if the 'number' value is not numerical, it is formatted to a numerical value using the '+' operator.
                d.number = +d.number;
            });

          // x domain is scaled with the data of 'year'
            x.domain(data.map(function(d) { return d.year; }));
          // y domain is scaled the data of 'number'
            y.domain([0, d3.max(data, function(d) { return d.number; })]);

          // append the rectangles for the bar chart
            svg.selectAll(".bar")
            //invoke the data using the .data method
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.year); })
              //the width of each bar will take the value of the bandwidth
                .attr("width", x.bandwidth())
                .attr("y", function(d) { return y(d.number); })
              //the height of each bar will be the number value from the data subtracted from the graph height
                .attr("height", function(d) { return height - y(d.number); });

          // x axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
              // the d3.axisBottom(scale) constructs a new axis generator for the given scale argument - ticks are drawn below the horizontal domain path
                .call(d3.axisBottom(x));

          // y axis
            svg.append("g")
              // the d3.axisLeft(scale) function - ticks are drawn to the left of the vertical domain path; taking y as the scale
                .call(d3.axisLeft(y));

          // the graph title, x and y axes implement the use of the <text> element in the svg format in html as well their respective attributes
          // x axis label
            svg.append("text")             
                .attr("transform",
                      "translate(" + (width/2) + " ," + 
                      (height + margin.top + 20) + ")")
                .style("text-anchor", "middle") 
                .text("Year(s)");

          // y axis label
          svg.append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 0 - margin.left)
              .attr("x",0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .text("Obesity: Number of Persons"); 

          // graph title
          svg.append("text")
              .attr("x", (width / 2))             
              .attr("y", 0 - (margin.top / 2))
              .attr("text-anchor", "middle")  
              .style("font-size", "16px") 
              .style("text-decoration", "underline")  
              .text("Obesity in England");

        });
    }
    this.erase = function() {
        $("svg").remove();
        $("canvas").remove();
    }
}