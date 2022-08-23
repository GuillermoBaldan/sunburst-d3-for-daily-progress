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
  
  export { showTitle, showData, showData1, showData2}