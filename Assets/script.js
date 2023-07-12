let dT = new Date(); // gets current date and time
// arrays for converting values into a string for the page title
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// get current.x
let current = {
  hour: dT.getHours(),
  day: days[dT.getDay()],
  month: monthNames[dT.getMonth()],
  year: dT.getFullYear(),
};

// gets M/D/Y for localStorage input
function fullDate() {
  return dT.getMonth() + 1 + "/" + dT.getDate() + "/" + dT.getFullYear();
}

$(function () {
  let body = $("body");
  let container = body.children().eq(1); // selects the hourBlock's to be parent container

  // prettier-ignore - gets text for todays date and injects into header
  let currentDT =
    "Today is " +
    current.day +
    ", " +
    current.month +
    " " +
    dT.getDate() +
    ", " +
    current.year;
  $("#currentDay").text(currentDT);

  // prints time blocks for each hour in the business day
  for (let h = 1; h < 25; h++) {
    // change back to 9 & 18
    // converts military time to standard
    let hourBlock = h;
    if (hourBlock > 12) {
      hourBlock = hourBlock - 12 + "PM";
    } else if (hourBlock === 12) {
      hourBlock = hourBlock + "PM";
    } else {
      hourBlock = hourBlock + "AM";
    }
    let timeAndDate = hourBlock + " | " + fullDate(); // makes localStorage more specic to a day.
    let getThisBlock = localStorage.getItem(timeAndDate);

    // prints rows to DOM
    let hourRow = $("<div>");
    container.append(hourRow);
    hourRow.addClass("row time-block past"); // remove .past after test
    let timeBlock = $("<div>");
    hourRow.append(timeBlock);
    timeBlock.addClass("col-2 col-md-1 hour text-center py-3");
    timeBlock.text(hourBlock);
    let textArea = $("<textarea>");
    hourRow.append(textArea);
    textArea.addClass("col-8 col-md-10 description");
    textArea.attr("rows", "3");
    let button = $("<button>");
    hourRow.append(button);
    button.addClass("btn saveBtn col-2 col-md-1");
    button.attr("area-label", "save");
    button.append('<i class="fas fa-save" aria-hidden="true"></i>');

    textArea.text(getThisBlock);

    if (h < current.hour) {
      textArea.css("background", "transparent");
    } else if (h > current.hour) {
      // prettier-ignore
      textArea.css({ "background-color": "green", 'color': "white" });
    } else {
      let actualTimePosition = function () {
        let getTime = new Date();
        let rowHeight = hourRow.height() / 60;
        let timeLinePosition = rowHeight * getTime.getMinutes() + "px";
        return timeLinePosition;
      };
      let timeLine = $("<div>");
      hourRow.append(timeLine);
      timeLine.addClass("time-line");
      let currentTimePill = $("<div>");
      timeLine.append(currentTimePill);
      currentTimePill.addClass("current-time-pill");
      let actualTime = function () {
        let getTime = new Date();
        let hr = getTime.getHours();
        let min = getTime.getMinutes();
        let sec = getTime.getSeconds();
        let amPm = " AM";
        if (hr > 12) {
          hr = hr - 12;
          amPm = " PM";
        }
        if (min < 10) {
          min = "0" + min;
        }
        if (sec < 10) {
          sec = "0" + sec;
        }
        return hr + ":" + min + ":" + sec + amPm;
      };
      currentTimePill.text(actualTime);
      timeLine.css("top", actualTimePosition);
      let refresh = setInterval(() => {
        currentTimePill.text(actualTime);
        timeLine.css("top", actualTimePosition);
      }, 1000);
      if (actualTime === "00:00:00") {
        clearInterval(refresh);
        location.reload();
      }
    }

    // does the same as the click listener below
    // button.on("click", function () {
    //   let inputText = textArea.val();
    //   localStorage.setItem(timeAndDate, inputText);
    // });
  }

  setInterval(() => {
    let rTime = new Date();
    let rMin = rTime.getMinutes();
    let rSec = rTime.getSeconds();
    if (rMin === 0 && rSec === 0) {
      location.reload();
    }
  }, 1000);

  container.on("click", ".btn", function () {
    let thisHour = $(this).parent().children().eq(0).text();
    let dateAndTime = thisHour + " | " + fullDate();
    let thisText = $(this).parent().children("textarea").val();
    localStorage.setItem(dateAndTime, thisText);
  });
});

function o(nion) {
  console.log(nion);
}
