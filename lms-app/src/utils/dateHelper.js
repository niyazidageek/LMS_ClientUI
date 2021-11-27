import moment from "moment";

class DateHelper {
  normalizedDate(date) {
    date = Date.parse(date);
    date = new Date(date);
    date = date.toDateString();
    date = date.replace(/\s+/g, "/");
    return date;
  }

  normalizedDateWithTime(date) {
    date = Date.parse(date);
    date = new Date(date);
    date = date.toLocaleString();
    return date;
  }

  normalizeDateToWeekDayAndDate(date) {
    date = Date.parse(date);
    date = new Date(date);
    date = date.toString();
    return moment(date).format("dddd MM.DD");
  }

  normalizeDateToTimeOnly(date) {
    date = Date.parse(date);
    date = new Date(date);
    return moment(date).format("HH:mm");
  }

  normalizedDateWithVerbalDateAndTime(date) {
    date = Date.parse(date);
    date = new Date(date);
    return moment(date).format("MMMM Do, HH:mm");
  }

  isLessonInProgress(startDate, endDate) {
    let now = new Date();
    startDate = Date.parse(startDate);
    endDate = Date.parse(endDate);
    if (now <= endDate && now >= startDate) {
      return true;
    } else {
      return false;
    }
  }

  isLessonOver(endDate) {
    let now = new Date();
    endDate = Date.parse(endDate);
    if (now > endDate) {
      return true;
    } else {
      return false;
    }
  }

  isLate(firstDate, compareDate) {
    firstDate = Date.parse(firstDate);
    compareDate = Date.parse(compareDate);
    if (firstDate >= compareDate) {
      return true;
    } else {
      return false;
    }
  }

  getNotificationAgoTimeString(createdDate) {
    let now = new Date();
    createdDate = new Date(createdDate);
    var newDate = new Date(
      createdDate.getTime() + createdDate.getTimezoneOffset() * 60 * 1000
    );
    var offset = createdDate.getTimezoneOffset() / 60;
    var hourstemp = createdDate.getHours();
    newDate.setHours(hourstemp - offset);
    createdDate = newDate;
    let days = parseInt((now - createdDate) / (1000 * 60 * 60 * 24));
    let hours = parseInt((Math.abs(now - createdDate) / (1000 * 60 * 60)) % 24);
    let minutes = parseInt(
      (Math.abs(now.getTime() - createdDate.getTime()) / (1000 * 60)) % 60
    );
    let seconds = parseInt(
      (Math.abs(now.getTime() - createdDate.getTime()) / 1000) % 60
    );

    if (days == 0 && hours == 0 && minutes == 0) {
      return `${seconds} seconds ago`;
    } else if (days == 0 && hours == 0) {
      return `${minutes} minutes ago`;
    } else if (days == 0) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  }
}

export const dateHelper = new DateHelper();
