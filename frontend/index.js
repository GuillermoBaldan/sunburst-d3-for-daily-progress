//Main Program Variables
let dailyTimePerProjectPerWeek = generateDataForBars(data);
let currentWeek = dailyTimePerProjectPerWeek.length - 1;
let weekValue = currentWeek;
let debugInbox = "weekValue";
//legend variables
let legendContainer;
let legend;


//Main Program
drawData();
