var colorsAngles = ['#ff0000', '#0066ff', '#9933ff', '#33cc33', '#663300'];
var positions = [300, 125, 650, 125, 300, 367, 650, 367];

// Initially sets up new graphs using constructors in other files for later use 
var obesityGraph = new Obesity;
var universityGraph = new University;
var salaryGraph = new Salary;
var workforceGraph = new Workforce;
var unemploymentGraph = new Unemployment;

// Array of new graph Objects for later use in conjunction with class index order
var graphObjects = [ universityGraph, unemploymentGraph, obesityGraph, salaryGraph, workforceGraph ];
var graphStrings = [ "University - The university data is perhaps the least interesting, and unexpectedly so. The bar chart was expected to take a dipping but from the seems of it. The numbers on the y-axis show that the number of young people going to university in proportionality to the population hasn't changed too much.", "Unemployment - Unemployment in London's one of the most interesting visualisations, because unlike the other visualisations there are abnormally long trends within it. The first being a rise in unemployment over time and the second being a drop. The possible reasons for these two trends can be vast. One for example may be the 2008 market crash, supported by the fact that the graph is on a rising slope from the first data point. The crash can or cannot be related to other reasons, one being massive imigration into London over 2010/2011. On the other hand the trend that follows 2012 shows a steady fall in unemployment. Revealing at the same time, due to the visualisation of workforce jobs increasing. A steady rise in quality of life in London.", "Obesity - With the increasing consumption of unhealthy snacks and fast food. Their prices are able to be dropped, making it difficult for more traditional, and naturally less stimulating food. To reach the average British consumer. As seen in rising trends with people's unhapiness in the prices of organic/vegan based foods in comparison to multinational food chain meals and snacks/beverages. There's a host of reasons, but this is a massive driver because it deals with the consumer's ease of access to nourishment.", "Salary - Salary data corresponds nicely with workforce data, hence the decision to use it. The use of a pie chart in p5 also made sense because it brings we're dealing with areas of London ( North, East, South, West, Central ). And for this metric to visualise the dominance of one over another makes the data most simplest to extract knowledge from. In that however we see over time, that salary concentration hasn't changed too much in London, regardless of the increase in workforce jobs in the capital. ", "Workforce - There are two lines in this line graph. A dark grey line showing corresponding with the y axis on the right representing London data. And a light grey line corresponding with UK data on the left. This data corresponds well with the unemployment data because as line graphs they're easy to compare to eachother - however with that being said the amount of jobs available has steadily risen. Most likely due to foreign investment after the 2008 crash - shown by the increasing international emmigration/expansion of UK companies and immigration of non-UK businesses in the past few years." ]

var graphLength = graphObjects.length;

// Preloads the salary data necessary for the pie-chart
var salaryData;
function preload() {
    salaryData = loadTable("folder_datasets/salary.csv", "csv", "header");
}

// Sets up the page along with the graph just once
function setup() {
    
    createCanvas(960, 500);
    background(255);
    graphObjects[2].creation();
    noStroke();
    noLoop();  // Run once and stop
    
}

// 
function draw() {
    
    $('.navLinkBox').click(function() {
        var graphIndex = $(this).index();
        function graphPick(indexForGraph) {
            graphObjects[0].erase();
            graphObjects[indexForGraph].creation();
            $('#graphAnalysis').text(graphStrings[indexForGraph]);
            for(i = 0; i < graphLength; i++) {
                if (i == indexForGraph) {
                    $('.showSpan').eq(i).css('font-weight', '900');
                } else {
                    $('.showSpan').eq(i).css('font-weight', '400');
                }
            }
        }
        graphPick(graphIndex);
    });
    
}
