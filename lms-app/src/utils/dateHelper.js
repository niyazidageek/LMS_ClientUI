import moment from 'moment'

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

  normalizeDateToWeekDayAndDate(date){
    date = Date.parse(date);
    date = new Date(date);
    date = date.toString();
    return moment(date).format('dddd MM.DD');
  }

  normalizeDateToTimeOnly(date){
    date = Date.parse(date);
    date = new Date(date);
    return moment(date).format('hh:mm');
  }

  normalizedDateWithVerbalDateAndTime(date){
    date = Date.parse(date);
    date = new Date(date);
    return moment(date).format('MMMM Do, h:mm:ss a');
  }

  isLessonInProgress(startDate,endDate){
    let now = new Date();
    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate);
    if(now<=endDate && now>=startDate){
      return true;
    }
    else{
      return false;
    }
  }

  isLessonOver(endDate){
    let now = new Date();
    endDate = Date.parse(endDate);
    if(now>endDate){
      return true;
    }
    else{
      return false;
    }
  }

}

export const dateHelper = new DateHelper();