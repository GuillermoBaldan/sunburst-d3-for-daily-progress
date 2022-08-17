let data = [
  {
    term: "ZP",
    data: [
      {
        count: 40,
        date: "08/08/2020",
      },
      {
        count: 50,
        date: "08/11/2021",
      },
      {
        count: 60,
        date: "12/05/2022",
      },
      {
        count: 60,
        date: "14/05/2022",
      },
    ],
  },
  {
    term: "scan-papers",
    data: [
      {
        count: 15,
        date: "12/05/2022",
      },
      {
        count: 15,
        date: "13/05/2022",
      },
      {
        count: 15,
        date: "14/05/2022",
      },
      {
        count: 15,
        date: "16/05/2022",
      },
    ],
  },
  {
    term: "theological-formation",
    data: [
      {
        count: 60,
        date: "12/05/2022",
      },
      {
        count: 105,
        date: "13/05/2022",
      },
      {
        count: 85,
        date: "14/05/2022",
      },
      {
        count: 60,
        date: "15/05/2022",
      },
    ],
  },
  {
    term: "job-search",
    data: [
      {
        count: 120,
        date: "12/05/2022",
      },
      {
        count: 60,
        date: "13/05/2022",
      },
      {
        count: 30,
        date: "14/05/2022",
      },
      {
        count: 60,
        date: "16/05/2022",
      },
    ],
  },
  {
    term: "pray",
    data: [
      {
        count: 60,
        date: "12/05/2022",
      },
    ],
  },
  {
    term: "real-state-investment",
    data: [
      {
        count: 60,
        date: "12/05/2022",
      },
      {
        count: 20,
        date: "08/08/2020",
      },
    ],
  },
  {
    term: "ideasrooms",
    data: [
      {
        count: 150,
        date: "12/05/2022",
      },
    ],
  },
  {
    term: "time-extractor",
    data: [
      {
        count: 90,
        date: "13/05/2022",
      },
    ],
  },
  {
    term: "personal-planning",
    data: [
      {
        count: 90,
        date: "13/05/2022",
      },
      {
        count: 10,
        date: "08/08/2020",
      },
    ],
  },
  {
    term: "verse-memorization",
    data: [
      {
        count: 15,
        date: "14/05/2022",
      },
      {
        count: 15,
        date: "15/05/2022",
      },
    ],
  },
  {
    term: "curso-fundamentos-Angular",
    data: [
      {
        count: 205,
        date: "14/05/2022",
      },
    ],
  },
  {
    term: "ideasrooms",
    data: [
      {
        count: 165,
        date: "14/05/2022",
      },
    ],
  },
  {
    term: "technical-prayer",
    data: [
      {
        count: 20,
        date: "14/05/2022",
      },
    ],
  },
  {
    term: "time-extractor",
    data: [
      {
        count: 270,
        date: "16/05/2022",
      },
    ],
  },
];

function generateWeekData(data) {
  let weekData = [];
  let dayArray = [];
  let auxData2 = [];
  //1) Recorremos el array de entrada
  dayArray = generateDataForBars(data);
  //2)Agrupamos los datos por semanas

  return auxData2;
}

function generateDataForBars(data) {
  let dataForBars = [];
  let dayArray = generateDayArray(data);
  ////showTitle("dayArray")
  ////showData(dayArray)
  dayArray.forEach((day) => {
    dataForBars.push({
      labels: ["M", "TU", "W", "TH", "F", "SA", "SU"],
      datasets: [],
      week: day.week,
      year: day.year,
    });
  });
  //Eliminamos todas las semanas redundantes de dataForBars
  for (let i = 0; i < dataForBars.length; i++) {
    for (let j = 0; j < dataForBars.length; j++) {
      if (dataForBars[i].week === dataForBars[j].week && j !== i) {
        dataForBars.splice(j, i);
        i = 0;
      }
    }
  }
  //Añadimos el campo label a datasets
  dayArray.forEach((day) => {
    dataForBars.forEach((week) => {
      if (day.week === week.week) {
        week.datasets.push({
          label: day.term,
        });
      }
    });
  });
  //showTitle("Añadimos el campo label a datasets")
  //showData(dataForBars)
  //Eliminamos todos los labels redundantes de datasets
  dataForBars.forEach((week) => {
    for (let i = 0; i < week.datasets.length; i++) {
      for (let j = 0; j < week.datasets.length; j++) {
        if (week.datasets[i].label === week.datasets[j].label && j !== i) {
          week.datasets.splice(j, 1);
          i = 0;
        }
      }
    }
  });
  //showTitle("Eliminamos todos los labels redundantes de datasets")
  //showData(dataForBars)
  //Añadimos el campo background color a datasets
  dataForBars.forEach((week) => {
    week.datasets.forEach((label) => {
      label.backgroundColor = getRandomColor();
    });
  });
  //Añadimos el campo data a datasets
  dataForBars.forEach((week) => {
    week.datasets.forEach((label) => {
      label.data = [];
    });
  });
  //showTitle("Añadimos el campo data a datasets")
  //showData(dataForBars)
  //Añadimos datos a data de datasets
  dayArray.forEach((day) => {
    dataForBars.forEach((week) => {
      if (day.week === week.week && day.year === week.year) {
        week.datasets.forEach((label) => {
          if (day.term === label.label) {
            label.data = dayToArrayWeek(day, label.data);
          }
        });
      }
    });
  });

  //showTitle("Data for Stack Bars")
  //showData(dataForBars)
  ////showTitle("Final Data Format - Added labels and datasets fields")
  ////showData(dataForBars)
  return dataForBars;
}

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
  //showTitle("Creeamos las semanas para el Sunburst")
  //showData(dataForSunburst)
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
            ////showTitle("<br>")
            //document.write(`fatherReferenceColor(label.label,referenceTypes): ${fatherReferenceColor(label.label,referenceTypes)}`)
          }
        });
      }
    });
  });

  //showTitle("Añadimos los reference types")
  //showData(dataForSunburst)
  //Añadimos los children de cada semana a los reference types
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
              //document.write("<br>")
              //document.write(`activityReferenceColor(label,referenceTypes): ${activityReferenceColor(label.label,referenceTypes)}`)
            }
          });
        });
        // sunweek.children.forEach( father =>{
        //     father.children.push({
        //       name: label.label,
        //       color: getRandomColor(),
        //       size: sumItems(label.data)
        //     })
        //   })
      }
    });
  });
  ////showTitle("Añadimos los children de cada semana a los reference types")
  ////showData(dataForSunburst);

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

let referenceTypes = [
  {
    name: "God Search",
    color: "dodgerblue",
    category: "type",
    children: [
      {
        name: "theological-formation",
        color: "PowderBlue",
        category: "activity",
      },
      {
        name: "pray",
        color: "cornflowerblue",
        category: "activity",
      },
      {
        name: "Bible",
        color: "green",
        category: "activity",
      },
      {
        name: "verse-memorization",
        color: "skyblue",
        category: "activity",
      },
      {
        name: "technical-prayer",
        color: "steelblue",
        category: "activity",
      },
    ],
  },
  {
    name: "Software Projects",
    children: [
      {
        name: "ZP",
        color: "yellow",
        category: "activity",
      },
      {
        name: "ideasrooms",
        color: "yellow",
        category: "activity",
      },
      {
        name: "time-extractor",
        color: "yellow",
        category: "activity",
      },
    ],
    color: "springgreen",
    category: "type",
  },
  {
    name: "bureaucratic stuff",
    color: "sienna",
    category: "type",
    children: [
      {
        name: "scan-papers",
        color: "peru",
        category: "activity",
      },
    ],
  },
  {
    name: "Job Search",
    color: "coral",
    category: "type",
    children: [
      {
        name: "job-search",
        color: "lightgreen",
        category: "activity",
      },
    ],
  },
  {
    name: "auto-coaching",
    color: "purple",
    category: "type",
    children: [
      {
        name: "personal-planning",
        color: "hotpink",
        category: "activity",
      },
    ],
  },
  {
    name: "Financial Affairs",
    color: "darkgoldenrod",
    category: "type",
    children: [
      {
        name: "real-state-investment",
        color: "gold",
        category: "activity",
      },
    ],
  },
  {
    name: "Web Development Trainning",
    color: "greenyellow",
    category: "type",
    children: [
      {
        name: "curso-fundamentos-Angular",
        color: "red",
        category: "activity",
      },
    ],
  },
];

function generateDayArray(data) {
  //document.write("Se mete en la función generateDayArray")
  let dayArray = [];
  ////showData(data)
  data.forEach((dataItem) => {
    //document.write(JSON.stringify(dataItem))
    //document.write("<br>")
    dataItem.data.forEach((dataItem2) => {
      //document.write(JSON.stringify(dataItem2))
      //document.write("<br>")
      dayArray.push({
        term: dataItem.term,
        count: dataItem2.count,
        date: dataItem2.date,
        week: dateToWeek(dataItem2.date),
        year: dateToYear(dataItem2.date),
      });
    });
  });

  return dayArray;
}

function sumItems(array) {
  let sum = 0;
  array.forEach((item) => {
    sum += item;
  });
  return sum;
}

function dayToArrayWeek(day, weekArray) {
  // document.write(day.date)
  // document.write("<br>")
  let dayweek = new Date(
    day.date.split("/")[2],
    day.date.split("/")[1] - 1,
    day.date.split("/")[0]
  ).getDay();
  if (weekArray.length === 0) {
    for (let i = 0; i < 7; i++) {
      weekArray.push(0);
    }
  }
  weekArray[dayweek] = day.count;
  return weekArray;
}

function dateToYear(date) {
  return date.split("/")[2];
}

function dateToWeek(date) {
  let newDate = new Date(
    dateToYear(date),
    date.split("/")[1] - 1,
    date.split("/")[0]
  );
  let oneJan = new Date(dateToYear(date), 0, 1);
  let numberOfDays = Math.floor((newDate - oneJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((newDate.getDay() + 1 + numberOfDays) / 7);
  return result;
}



//Functions for Debugging

function showTitle(string) {
  document.write(`<h1>${string}</h1>`);
}

function showData(data) {
  if (data.length > 0) {
    //Si data es array
    data.forEach((item) => {
      document.write(JSON.stringify(item));
      document.write("<br>");
      document.write("------------");
      document.write("<br>");
    });
  } else {
    //Si data es objeto
    document.write(JSON.stringify(data));
    document.write("<br>");
    document.write("------------");
    document.write("<br>");
  }
}

function debugLabel(message) {
  debugInbox += message;
  debugInbox += "\n";
  document.getElementById("debug").textContent = debugInbox;
}

function showData1(auxData1) {
  auxData1.forEach((item) => {
    document.write("<br>");
    document.write(`term: ${item.term}`);
    document.write("<br>");
    document.write(`count: ${item.count}`);
    document.write("<br>");
    document.write(`date: ${item.date}`);
    document.write("<br>");
    document.write(`year: ${item.year}`);
    document.write("<br>");
    document.write(`week: ${item.week}`);
    document.write("<br>");
    document.write("--------------");
  });
}

function showData2(auxData2) {
  auxData2.forEach((item) => {
    document.write("<br>");
    document.write(`year: ${item.year}`);
    document.write("<br>");
    document.write(`week: ${item.week}`);
    document.write("<br>");
    document.write(`labels: ${item.labels}`);
    document.write("<br>");
    item.datasets.forEach((data) => {
      document.write(`${JSON.stringify(data)}`);
      document.write("<br>");
    });
    document.write("--------------");
  });
}

function checkFilter(auxData1) {
  return auxData1.filter((item) => item.term === "ideasrooms");
}

function drawSunburst() {
  dataForSunburst = generateDataForSunburst(generateDataForBars(data))[
    weekValue
  ];
  root = d3.hierarchy(dataForSunburst);
  //debugLabel(`currentWeek Value: ${weekValue}`)
  //debugLabel(JSON.stringify(dataForSunburst))
  //Code for Sunburst
  // define json object
  //The data is defined at https://codepen.io/Baldan/pen/NeawxP.js

  // set width, height, and radius
  (width = 325), (height = 325), (radius = Math.min(width, height) / 2 - 10); // lowest number divided by 2. Then subtract 10

  // legend dimensions
  legendRectSize = 15; // defines the size of the colored squares in legend
  legendSpacing = 6; // defines spacing between squares

  formatNumber = d3.format(",d"); // formats floats

  x = d3
    .scaleLinear() // continuous scale. preserves proportional differences
    .range([0, 2 * Math.PI]); // setting range from 0 to 2 * circumference of a circle

  y = d3
    .scaleSqrt() // continuous power scale
    .range([0, radius]); // setting range from 0 to radius

  partition = d3.partition(); // subdivides layers

  // define arcs
  arc = d3
    .arc()
    .startAngle(function (d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function (d) {
      return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function (d) {
      return Math.max(0, y(d.y0));
    })
    .outerRadius(function (d) {
      return Math.max(0, y(d.y1));
    });

  //**********************
  //        TOOLTIP
  //**********************

  // define tooltip
  tooltip = d3
    .select("body") // select element in the DOM with id 'chart'
    .append("div")
    .classed("tooltip", true); // append a div element to the element we've selected
  tooltip
    .append("div") // add divs to the tooltip defined above
    .attr("class", "label"); // add class 'label' on the selection
  tooltip
    .append("div") // add divs to the tooltip defined above
    .attr("class", "count"); // add class 'count' on the selection
  tooltip
    .append("div") // add divs to the tooltip defined above
    .attr("class", "percent"); // add class 'percent' on the selection

  //**********************
  //        CHART
  //**********************
  // prep the data

  // calculate total
  var total = 0;

  // must call sum on the hierarchy first
  // and as we're doing that, total up the sum of the chart
  root.sum(function (d) {
    if (d.size) {
      total += d.size;
    }
    return d.size;
  });

  // enable data as true true
  ////showTitle("root.data")
  ////showData(root)
  root.data.children.forEach(function (d) {
    d.enabled = true;
  });

  // define SVG element
  svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width) // set width
    .attr("height", height) // set height
    .append("g") // append g element
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // redraw(root);
  path = svg
    .selectAll("path")
    .data(partition(root).descendants()) // path for each descendant
    .enter()
    .append("path")
    .attr("d", arc) // draw arcs
    .attr("class", "path")
    .style("fill", function (d) {
      let color;
      if (d.children) {
        color = d.data.color;
      } else {
        color = d.data.color;
        //color = d.parent.data.color;
        //document.write("<br>")
        //document.write("Mostramos d")
        //document.write(JSON.stringify(d.data))
        //document.write("<br>")
        //document.write("<br>")
        //document.write("<br>")
      }
      //return (d.children ? d : d.parent).data.color;

      return color;
    })
    .on("click", click)
    .on("mouseover", function (d) {
      ////showTitle("variable: d")
      //document.write(typeof d)
      //document.write("<br>")
      //document.write(d)
      /* for(let field in d){
        document.write("<br>")
        document.write(field)
        document.write(":   ")
        document.write(d[field])
        document.write("<br>")
      }
      //showTitle("parentField")
      for(let parentField in d["parent"]){
        document.write("<br>")
        document.write(parentField)
        document.write(":   ")
        document.write(d["parent"][parentField])
        document.write("<br>")
      } */
      let total = d.parent.value;

      var percent = Math.round((1000 * d.value) / total) / 10; // calculate percent
      tooltip.select(".label").html(d.data.name); // set current label
      tooltip.select(".count").html(d.value); // set current count
      tooltip.select(".percent").html(percent + "%"); // set percent calculated above
      tooltip.style("display", "block"); // set display
    })
    .on("mouseout", function () {
      // when mouse leaves div
      tooltip.style("display", "none"); // hide tooltip for that element
    })
    .on("mousemove", function (d) {
      // when mouse moves
      tooltip.style("top", d3.event.layerY + 10 + "px"); // always 10px below the cursor
      tooltip.style("left", d3.event.layerX + 10 + "px"); // always 10px to the right of the mouse
    });

  d3.select(self.frameElement).style("height", height + "px");

  //**********************
  //        LEGEND
  //**********************

  // legend HTML

  //function drawLegend(){

  legendContainer = d3
    .select("#legend")
    .append("div")
    .classed("legends clearfix", true);
  legend = legendContainer
    .selectAll(".legend")
    .data(root.children)
    .enter()
    .append("div") // replace placeholders with g elements
    .attr("class", "legend"); // each g is given a legend class

  rect = legend
    .append("div")
    .classed("rect", true) // append rectangle squares to legend
    .style("background-color", function (d) {
      return d.data.color;
    })
    .style("border", function (d) {
      return "1px solid";
    })
    .on("click", function (d) {
      var rect = d3.select(this); // this refers to the colored squared just clicked

      var totalEnabled = d3.sum(
        root.children.map(function (d) {
          return d.data.enabled ? 1 : 0; // return 1 for each enabled entry. and summing it up
        })
      );

      if (rect.classed("clicked")) {
        rect.classed("clicked", false).style("background-color", function (d) {
          return d.data.color;
        });
        d.data.enabled = true;
        // filter data and rerender
      } else {
        rect.classed("clicked", true).style("background-color", "transparent");
        d.data.enabled = false;
      }

      var enabledCategory = Object.assign({}, d);
      enabledCategory = d3.hierarchy(enabledCategory.parent.data);
      //     console.log('enabledCopy')

      //     console.log(enabledCategory)

      enabledCategory.children = [];
      // console.log('empty copy')
      // console.log(enabledCategory)

      d.parent.children.forEach(function (child) {
        if (child.data.enabled === true) {
          enabledCategory.children.push(child);
        }
      });

      enabledCategory.sum(function (d) {
        if (d.size) {
          total += d.size;
        }
        return d.size;
      });

      //     console.log('full copy')
      //     console.log(enabledCategory)

      redraw(enabledCategory);
    }); // end legend onclick

  // adding text to legend
  legend.append("span").text(function (d) {
    return d.data.name;
  });

  svg
    .append("text")
    .attr("class", "total")
    .attr("text-anchor", "middle")
    .attr("font-size", "4em")
    .attr("y", 20)
    .text(total);
  //**************************
  //LEGEND OF CHILDS
  //**************************

  //showTitle("Data for Sunburst")
  //showData(dataForSunburst)
  dataForSunburst.children.forEach((item) => {
    //item.name = "TOTAL"
    legendContainer = d3
      .select("#legend")
      .append("div")
      .classed("legends clearfix", true);

    legend = legendContainer
      .selectAll(".legend")
      .data(d3.hierarchy(item).children)
      .enter()
      .append("div") // replace placeholders with g elements
      .attr("class", "legend"); // each g is given a legend class

    rect = legend
      .append("div")
      .classed("rect", true) // append rectangle squares to legend
      .style("background-color", function (d) {
        return d.data.color;
      })
      .style("border", function (d) {
        return "1px solid";
      })
      .on("click", function (d) {
        var rect = d3.select(this); // this refers to the colored squared just clicked

        var totalEnabled = d3.sum(
          root.children.map(function (d) {
            return d.data.enabled ? 1 : 0; // return 1 for each enabled entry. and summing it up
          })
        );

        if (rect.classed("clicked")) {
          rect
            .classed("clicked", false)
            .style("background-color", function (d) {
              return d.data.color;
            });
          d.data.enabled = true;
          // filter data and rerender
        } else {
          rect
            .classed("clicked", true)
            .style("background-color", "transparent");
          d.data.enabled = false;
        }

        var enabledCategory = Object.assign({}, d);
        enabledCategory = d3.hierarchy(enabledCategory.parent.data);
        //     console.log('enabledCopy')

        //     console.log(enabledCategory)

        enabledCategory.children = [];
        // console.log('empty copy')
        // console.log(enabledCategory)

        d.parent.children.forEach(function (child) {
          if (child.data.enabled === true) {
            enabledCategory.children.push(child);
          }
        });

        enabledCategory.sum(function (d) {
          if (d.size) {
            total += d.size;
          }
          return d.size;
        });

        //     console.log('full copy')
        //     console.log(enabledCategory)

        redraw(enabledCategory);
      }); // end legend onclick

    // adding text to legend of childs
    legend.append("span").text(function (d) {
      return d.data.name;
    });
    //Borramos text si existe
    if (document.getElementsByTagName("text").length > 0) {
    }
    svg
      .append("text")
      .attr("class", "total")
      .attr("text-anchor", "middle")
      .attr("font-size", "4em")
      .attr("y", 20)
      .text("");

    //End of Legend of childs
  });
  //}End drawLegend()

  //**********************
  //       FUNCTIONS
  //**********************

  drawArc = d3.svg
    .arc()
    .innerRadius(function (d, i) {
      return arcMin + i * arcWidth + arcPad;
    })
    .outerRadius(function (d, i) {
      return arcMin + (i + 1) * arcWidth;
    })
    .startAngle(0 * (PI / 180))
    .endAngle(function (d, i) {
      return Math.floor(d * 6 * (PI / 180) * 1000) / 1000;
    });

  // redraw on disabled category
} //End of drawSunburst function

//Sunburst drawing functions

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
// find ancestors
function getRootmostAncestorByWhileLoop(node) {
  while (node.depth > 1) node = node.parent;
  return node;
}

//Main Program Variables
let dailyTimePerProjectPerWeek = generateDataForBars(data);
let currentWeek = dailyTimePerProjectPerWeek.length - 1;
let weekValue = currentWeek;
let debugInbox = "weekValue";
//legend variables
let legendContainer;
let legend;

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

function deleteSunburst() {
  while (fatherElement.firstChild) {
    fatherElement.removeChild(fatherElement.firstChild);
  }
}

//Main Program
drawData();
