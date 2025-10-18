const margin = { top: 40, right: 30, bottom: 50, left: 70};
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

let innerChartS;

const tooltipWidth = 65;
const tooltipHeight = 32;

//Create a bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)//accessor for energy consumption

    
const yScale = d3.scaleLinear();
const xScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colourScale = d3.scaleOrdinal(d3.schemeCategory10);

const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

const filters_screen = [
    { id:"all", label: "All", isActive: true },  
    { id:"LED", label: "LED", isActive: false }, 
    { id:"LCD", label: "LCD", isActive: false },
    { id:"OLED", label: "OLED", isActive: false }
];

