const events = [
    { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
    {
      title: "Rendezvous",
      start: getDate("YEAR-MONTH-07"),
      end: getDate("YEAR-MONTH-10")
    }
  ];
  
  function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
  
    if (month.length === 1) {
      month = "0" + month;
    }
  
    return dayString.replace("YEAR", year).replace("MONTH", month);
  }
  
  export default events;
  