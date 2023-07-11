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
  for (let h = 9; h < 18; h++) {
    // converts military time to standard
    let hourBlock = h;
    if (hourBlock > 12) {
      hourBlock = hourBlock - 12 + "PM";
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
    }

    // does the same as the click listener below
    // button.on("click", function () {
    //   let inputText = textArea.val();
    //   localStorage.setItem(timeAndDate, inputText);
    // });
  }

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
