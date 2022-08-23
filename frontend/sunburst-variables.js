//Sunburst chart variables
let fatherElement = document.getElementById("chart");
let dataForSunburst = generateDataForSunburst(generateDataForBars(data))[
  currentWeek
];
let root = d3.hierarchy(dataForSunburst);
let width, height, radius, legendRectSize, legendSpacing, formatNumber;
let x, y, partition, arc;
let tooltip;
let svg;
let path;
let drawArc;

export { fatherElement, dataForSunburst,root,width,height,radius,
legendRectSize, legendSpacing, formatNumber, x, y, partition, arc,
tooltip, svg, path, drawArc}