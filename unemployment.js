var Unemployment = function() {
    this.creation = function() {
        // setting graph dimensions and margins
        var margin = {top: 40, right: 20, bottom: 70, left: 70},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // parse the date / time in order to generate human readable ticks - this is to format the dates as [date month]
        var parseTime = d3.timeParse("%d-%b-%y");
        var formatTime = d3.timeFormat("%e %B");

        // setting the ranges of x and y
        // x uses d3.scaleTime() which constructs a new time scale with the range being between 0 and the width of the graph
        var x = d3.scaleTime().range([0, width]);
        // y uses d3.scaleLinear() which constructs a new continuous scale with the range being between 0 and the height of the graph
        var y = d3.scaleLinear().range([height, 0]);

        // defining the line, adding the data to the line
        var valueline = d3.line()
            // each time this line function is called, it will go through the data pointed to and passing coordinates to 'date' and 'london' pairs using the 'x' and 'y' functions set up in lines 48 and 49
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.london); });

        var div = d3.select("body").append("div")
            .attr("class", "interactivebox")
            .style("opacity", 0);

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
        d3.csv("folder_datasets/unemployment-region.csv", function(error, data) {
          // the throw statement allows for the creation of a custom error
            if (error) throw error;

          // format the data
            data.forEach(function(d) {
              d.date = parseTime(d.date);
              d.london = +d.london;
            });

          // x domain is scaled with the data of 'date'
            x.domain(d3.extent(data, function(d) { return d.date; }));
          // y domain is scaled with the data of 'london'
            y.domain([0, d3.max(data, function(d) { return d.london; })]);

          // add the line path - using the svg <path> element
            svg.append("path")
                .data([data])
              // append a class named line
                .attr("class", "line")
              // path description attribute takes the valueline defined earlier
                .style("fill","none")
                .style("stroke","gainsboro")
                .style("stroke-width","2px")
                .attr("d", valueline);

          // add the dots with interactive boxes
            svg.selectAll("dot")
                .data(data)
           // for all of the data append a circle with a radius of 2 pixels, with x and y positions relative to their position on the line
                .enter().append("circle")
                .attr("r", 2)
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.london); })
                .on("mouseover", function(d) {
                div.transition()
                 // mouse over transition faster than mouse out transition
                    .duration(200)
                    .style("opacity", .9);
                div.html(formatTime(d.date) + "<br/>" + d.london)
                 // style the box so that it appears to the right and above the cursor/pointer
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
               })
             // when the mouse is moved away from the dot, the opacity becomes 0 in 500ms
                .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                });

          // x axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
              // the d3.axisBottom(scale) constructs a new axis generator for the given scale argument - ticks are drawn below the horizontal domain path; taking x as the scale
                .call(d3.axisBottom(x));

          // y axis
            svg.append("g")
                .attr("class", "axis")
              // the d3.axisLeft(scale) function - ticks are drawn to the left of the vertical domain path; taking y as the scale
                .call(d3.axisLeft(y));

          // the graph title, x and y axes implement the use of the <text> element in the svg format in html as well their respective attributes
          // x axis label
            svg.append("text")             
                .attr("transform",
                    "translate(" + (width/2) + " ," + 
                                   (height + margin.top + 30) + ")")
                .style("text-anchor", "middle") 
                .text("Date");

          // y axis label
            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Number of People Unemployed ('000s)");

          // graph title
            svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "underline")  
                .text("Unemployment in London");
        });   
    }
    this.erase = function() {
        $("svg").remove();
        $("canvas").remove();
    }
}
