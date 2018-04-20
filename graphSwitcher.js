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
        }
        graphPick(graphIndex);
    });
    
}
