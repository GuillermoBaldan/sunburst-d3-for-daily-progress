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

  export {drawSunburst}