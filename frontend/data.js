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

export { data, referenceTypes };
