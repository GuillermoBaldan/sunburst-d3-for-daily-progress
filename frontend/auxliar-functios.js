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

export { getRandomColor, generateWeekData, generateDataForBars };
