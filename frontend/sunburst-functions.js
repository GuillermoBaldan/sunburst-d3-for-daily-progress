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

export { generateDataForSunburst };
