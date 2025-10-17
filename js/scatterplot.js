// Use separate SVG variable name to avoid overwriting the histogram one
const svgS = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

// Use the global innerChartS already declared in shared-constants.js
innerChartS = svgS.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip") 
    .style("opacity", 0);

const drawScatterplot = (data) => {
    // Set colour domain based on screen type
    colourScale.domain([...new Set(data.map(d => d.screenTech))]);

    // Scales
    const xExtent = d3.extent(data, d => d.star);
    const yExtent = d3.extent(data, d => d.energyConsumption); // energy consumption vs star rating

    xScaleS.domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
        .range([0, innerWidth]);

    yScaleS.domain([yExtent[0], yExtent[1]])
        .range([innerHeight, 0])
        .nice();

    // Circles
    innerChartS.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", d => xScaleS(d.star))
        .attr("cy", d => yScaleS(d.energyConsumption))
        .attr("r", 4)
        .attr("fill", d => colourScale(d.screenTech))
        .attr("opacity", 0.5);

    // X-axis
    const bottomAxis = d3.axisBottom(xScaleS);
    innerChartS.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Y-axis
    const leftAxis = d3.axisLeft(yScaleS);
    innerChartS.append("g").call(leftAxis);

    // Axis labels
    svgS.append("text")
        .text("Star Rating")
        .attr("x", width - 40)
        .attr("y", height - 10)
        .attr("text-anchor", "end")
        .attr("class", "axis-label");

    svgS.append("text")
        .text("Energy Consumption (kWh/year)")
        .attr("x", 40)
        .attr("y", 20)
        .attr("class", "axis-label");



    
    const legend = svgS.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 140}, ${margin.top})`);

    const uniqueTechs = [...new Set(data.map(d => d.screenTech))]; // ✅ match your real key

    uniqueTechs.forEach((tech, i) => {
        const g = legend.append("g")
            .attr("transform", `translate(0, ${i * 22})`);

        g.append("rect")
            .attr("width", 12)
            .attr("height", 12)
            .attr("fill", colourScale(tech))   // ✅ same variable as above

        g.append("text")
            .attr("x", 18)
            .attr("y", 10)
            .text(tech)
            .attr("class", "axis-label");
    });

};
