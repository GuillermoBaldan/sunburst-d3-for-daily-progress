//Random Functions
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

  dayArray.forEach((day) => {
    dataForBars.push({
      labels: ["M", "TU", "W", "TH", "F", "SA", "SU"],
      datasets: [],
      week: day.week,
      year: day.year,
    });
  });

  for (let i = 0; i < dataForBars.length; i++) {
    for (let j = 0; j < dataForBars.length; j++) {
      if (dataForBars[i].week === dataForBars[j].week && j !== i) {
        dataForBars.splice(j, i);
        i = 0;
      }
    }
  }

  dayArray.forEach((day) => {
    dataForBars.forEach((week) => {
      if (day.week === week.week) {
        week.datasets.push({
          label: day.term,
        });
      }
    });
  });

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

  dataForBars.forEach((week) => {
    week.datasets.forEach((label) => {
      label.backgroundColor = getRandomColor();
    });
  });

  dataForBars.forEach((week) => {
    week.datasets.forEach((label) => {
      label.data = [];
    });
  });

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
  return dataForBars;
}

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

export { getRandomColor, generateWeekData, generateDataForBars, generateDayArray, sumItems, dateToWeek };
