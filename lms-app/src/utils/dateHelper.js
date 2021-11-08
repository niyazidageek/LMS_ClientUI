class DateHelper{
  
  normalizedDate(date) {
    date = Date.parse(date);
    date = new Date(date);
    date = date.toDateString();
    date = date.replace(/\s+/g, "/");
    return date;
  }

  normalizedDateWithTime(date){
    date = Date.parse(date);
    date = new Date(date);
    date = date.toLocaleString();
    return date;
  }

}

export const dateHelper = new DateHelper();