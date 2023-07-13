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

  // input fields
  let startHour = 8;
  let endHour = 18;
  let storageStart = localStorage.getItem("startHour");
  if (storageStart == null) {
    storageStart = startHour;
    localStorage.setItem("startHour", startHour);
  }
  let storageEnd = localStorage.getItem("endHour");
  if (storageEnd == null) {
    storageEnd = endHour;
    localStorage.setItem("endHour", storageEnd);
  }

  let startInput = $("<select>");
  $("#inputs").append(startInput);
  startInput.append(
    "<option>1</option>",
    "<option>2</option>",
    "<option>3</option>",
    "<option>4</option>",
    "<option>5</option>",
    "<option>6</option>",
    "<option>7</option>",
    "<option>8</option>",
    "<option>9</option>",
    "<option>10</option>",
    "<option>11</option>",
    "<option>12</option>"
  );
  startInput.val(storageStart);

  let startAmPm = $("<select>");
  $("#inputs").append(startAmPm);
  startAmPm.append(
    "<option value='AM'>AM</option>",
    "<option value='PM'>PM</option>"
  );

  let endInput = $("<select>");
  $("#inputs").append(endInput);
  endInput.append(
    "<option>1</option>",
    "<option>2</option>",
    "<option>3</option>",
    "<option>4</option>",
    "<option>5</option>",
    "<option>6</option>",
    "<option>7</option>",
    "<option>8</option>",
    "<option>9</option>",
    "<option>10</option>",
    "<option>11</option>",
    "<option>12</option>"
  );

  let endAmPm = $("<select>");
  $("#inputs").append(endAmPm);
  endAmPm.append(
    "<option value='AM'>AM</option>",
    "<option value='PM'>PM</option>"
  );

  if (storageEnd > 12) {
    storageEnd = storageEnd - 12;
    endAmPm.val("PM");
  }
  endInput.val(storageEnd);

  let hoursBtn = $("<button>");
  $("#inputs").append(hoursBtn);
  hoursBtn.text("Apply");

  hoursBtn.on("click", function () {
    let startVal = startInput.val();
    let endVal = endInput.val();
    if (endAmPm.val() == "PM") {
      endVal = parseInt(endVal) + 12;
      o(endVal);
    }
    if (startAmPm.val() == "PM") {
      startVal = parseInt(startVal) + 13;
    }

    startHour = startVal;
    localStorage.setItem("startHour", startVal);

    endHour = endVal;
    localStorage.setItem("endHour", endVal);
    container.text("");
    renderHours();
  });
  // input fields

  function renderHours() {
    storageStart = localStorage.getItem("startHour");
    storageEnd = localStorage.getItem("endHour");
    let a = parseInt(storageStart); // coverts storage item to num
    let b = parseInt(storageEnd) + 1; // coverts storage item to num
    // prints time blocks for each hour in the business day
    for (let h = a; h < b; h++) {
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
      hourRow.addClass("row time-block"); // remove .past after test
      let timeBlock = $("<div>");
      hourRow.append(timeBlock);
      timeBlock.addClass("col-2 col-md-1 hour text-center py-3");
      timeBlock.text(hourBlock);
      let textArea = $("<textarea>");
      hourRow.append(textArea);
      textArea.addClass("col-8 col-md-9 description");
      textArea.attr("rows", "3");
      let deleteBtn = $("<button>");
      hourRow.append(deleteBtn);
      deleteBtn.addClass("delete-btn col-2 col-md-1");
      deleteBtn.append('<i class="fas fa-trash" aria-hidden="true"></i>');
      let button = $("<button>");
      hourRow.append(button);
      button.addClass("btn saveBtn col-2 col-md-1");
      button.attr("area-label", "save");
      button.append('<i class="fas fa-save" aria-hidden="true"></i>');

      textArea.text(getThisBlock);

      if (h < current.hour) {
        textArea.addClass("past");
      } else if (h > current.hour) {
        // prettier-ignore
        textArea.addClass('future');
      } else {
        hourRow.css("z-index", "3");
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
          } else if (hr == 12) {
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
  }

  renderHours();

  setInterval(() => {
    let rTime = new Date();
    let rMin = rTime.getMinutes();
    let rSec = rTime.getSeconds();
    if (rMin == 0 && rSec == 0) {
      location.reload();
    }
  }, 1000);

  // adds this item to localStorage
  container.on("click", ".btn", function () {
    let thisHour = $(this).parent().children().eq(0).text();
    let dateAndTime = thisHour + " | " + fullDate();
    let thisText = $(this).parent().children("textarea").val();
    localStorage.setItem(dateAndTime, thisText);
  });

  // deletes this item from localStorage and re renders section
  container.on("click", ".delete-btn", function () {
    let thisHour = $(this).parent().children().eq(0).text();
    let dateAndTime = thisHour + " | " + fullDate();
    localStorage.removeItem(dateAndTime);
    $(this).parent().children().eq(1).val("");
  });

  container.on("focus", "textarea", function () {
    let currentTime = new Date().getHours();
    if (currentTime > 12) {
      currentTime = currentTime - 12;
    }
    let currentTimeBlock = $(this)
      .parent()
      .children(".hour")
      .text()
      .slice(0, -2);
    if (currentTimeBlock == currentTime) {
      $(".time-line").css("opacity", "0.15");
    }
    $(this)
      .parent()
      .css({ "box-shadow": "var(--overlay-shadow)", "z-index": "2" });
    // $(this).parent().siblings().css("opacity", "0.5");
    container.on("focusout", "textarea", function () {
      $(this).parent().css({ "box-shadow": "none", "z-index": "0" });
      //$(this).parent().siblings().css("opacity", "1");
      $(".time-line").css("opacity", "1");
    });
  });
});

function o(nion) {
  console.log(nion);
}
