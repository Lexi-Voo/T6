const drawHistogram = (data) => {

    const bins = binGenerator(data); //save the bins into an array
    console.log(bins); //log the bins to the console

    const minEng = bins [0].x0; //lower bound of the first bin
    const maxEng = bins [bins.length-1].x1; //upper bound of the last bin
    const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins


    xScale
        .domain([minEng, maxEng]) .range([0, innerWidth]);
    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Use the nice() method to round the y-axis values

    
    innerChart
        .selectAll("rect") .data(bins)
        .join("rect")
        .attr("x", d => xScale (d.x0))
        .attr("y", d => yScale (d.length))
        .attr("width", d => xScale (d.x1)- xScale (d.x0))
        .attr("height", d => innerHeight - yScale (d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor) // Set the stroke color gives appearance of gap
        .attr("stroke-width", 2);


    // Add x-axis
    const bottomAxis = d3.axisBottom(xScale);
    
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add x-axis label
    svg
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("text-anchor", "end")
        .attr("x", width - 20)
        .attr("y", height - 5)
        .attr("class", "axis-label");



    const leftAxis = d3.axisLeft(yScale);
    // Add the y-axis to the bottom of the chart relative to the inner chart innerChart
    innerChart
        .append("g")
        .call(leftAxis);    
    svg
        .append("text")
        .text("Frequency")
        .attr("x", 30)
        .attr("y", 20)
        .attr("class", "axis-label");
}

const svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)

const innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


const updateHistogram = (filterId, data) => {
    const updatedData = filterId === "all"
        ? data
        : data.filter(tv => tv.screenTech === filterId); 

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect")

        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
}

