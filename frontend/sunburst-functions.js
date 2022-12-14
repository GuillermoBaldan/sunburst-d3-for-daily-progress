//Sunburst drawing functions

function generateDataForSunburst(dataByWeek) {
  let dataForSunburst = [];
  //Creamos los datos para tener un Sunburst por semana
  dataByWeek.forEach((week) => {
    dataForSunburst.push({
      week: week.week,
      year: week.year,
      name: "TOTAL",
      children: [],
      color: "white",
    });
  });

  //Añadimos los reference types
  dataForSunburst.forEach((sunweek) => {
    dataByWeek.forEach((week) => {
      if (week.week === sunweek.week && week.year === sunweek.year) {
        week.datasets.forEach((label) => {
          if (
            sunweek.children.filter(
              (child) =>
                child.name === fatherReference(label.label, referenceTypes)
            ).length === 0
          ) {
            sunweek.children.push({
              name: fatherReference(label.label, referenceTypes),
              color: fatherReferenceColor(label.label, referenceTypes),
              children: [],
            });
          }
        });
      }
    });
  });

  dataByWeek.forEach((week) => {
    dataForSunburst.forEach((sunweek) => {
      if (week.week === sunweek.week && week.year === sunweek.year) {
        sunweek.children.forEach((father) => {
          week.datasets.forEach((label) => {
            if (father.name === fatherReference(label.label, referenceTypes)) {
              father.children.push({
                name: label.label,
                color: activityReferenceColor(label.label, referenceTypes),
                size: sumItems(label.data),
              });
            }
          });
        });
      }
    });
  });
  return dataForSunburst;
}

function fatherReference(label, referenceTypes) {
  let fatherReference;
  referenceTypes.forEach((item) => {
    item.children.forEach((child) => {
      if (child.name === label) {
        fatherReference = item.name;
      }
    });
  });
  return fatherReference;
}

function fatherReferenceColor(label, referenceTypes) {
  let colorReference;
  referenceTypes.forEach((item) => {
    item.children.forEach((child) => {
      if (child.name === label) {
        colorReference = item.color;
      }
    });
  });
  return colorReference;
}

function activityReferenceColor(label, referenceTypes) {
  let colorReference;
  referenceTypes.forEach((item) => {
    item.children.forEach((child) => {
      if (child.name === label) {
        colorReference = child.color;
      }
    });
  });
  return colorReference;
}

function deleteSunburst() {
  while (fatherElement.firstChild) {
    fatherElement.removeChild(fatherElement.firstChild);
  }
}

function incrementWeek() {
  if (weekValue === dailyTimePerProjectPerWeek.length - 1) {
    console.log("This is the current week");
  } else {
    weekValue += 1;
    drawData();
  }
}

function decrementWeek() {
  if (weekValue === 0) {
    console.log("This is the oldest week of the time series");
  } else {
    weekValue -= 1;
    drawData();
  }
}

function drawData() {
  //Delete previous diagram
  //1) Seleccionamos el elemento padre
  //2) Borramos todos sus hijos
  //debugLabel("drawData function")
  deleteSunburst();
  //Draw new Sunburst
  drawSunburst();
  //At first time weekValue points to the current week
  //Functions for Stackbars
  //chart.data = dailyTimePerProjectPerWeek[weekValue];
  //chart.update();
  drawLegend();
}

// find ancestors
function getRootmostAncestorByWhileLoop(node) {
  while (node.depth > 1) node = node.parent;
  return node;
}

// zoom on click


function click(d) {
  console.log("function click");
  console.log("d.y0 = " + d.y0);

  svg
    .transition()
    .duration(750) // duration of transition
    .tween("scale", function () {
      var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
        yd = d3.interpolate(y.domain(), [d.y0, 1]),
        yr = d3.interpolate(y.range(), [d.y0 ? 80 : 0, radius]);
      return function (t) {
        x.domain(xd(t));
        y.domain(yd(t)).range(yr(t));
      };
    })
    .selectAll("path")
    .attrTween("d", function (d) {
      return function () {
        return arc(d);
      };
    });
  d3.select(".total").text(d.value);
}

function redraw(d) {
  console.log("function redraw");

  svg
    .transition()
    .duration(750)
    .tween("scale", function () {
      var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
        yd = d3.interpolate(y.domain(), [d.y0, 1]),
        yr = d3.interpolate(y.range(), [d.y0 ? radius / 2 : 0, radius]);
      return function (t) {
        x.domain(xd(t));
        y.domain(yd(t)).range(yr(t));
      };
    })
    .selectAll("path")
    .attrTween("d", function (d) {
      return function () {
        return arc(d);
      };
    });

  d3.select(".total").text(d.value);
}



export { generateDataForSunburst,fatherReference,fatherReferenceColor,
  activityReferenceColor,deleteSunburst,incrementWeek,decrementWeek,
drawData, getRootmostAncestorByWhileLoop, click, redraw };
